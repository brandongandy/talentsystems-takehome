import { test, expect } from '@playwright/test';

const SEARCH_TERMS = [
  'towels',
  'beauty product',
  'pet food'
];

test.describe('Shopping cart user experience', () => {
  SEARCH_TERMS.forEach( term => {
    test(`${ term } should be the same price in cart and in store`, async ({ browser }, testInfo) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://www.target.com/');
      
      await page.getByTestId('\\@web\\/Search\\/SearchInput').click();
      await page.getByTestId('\\@web\\/Search\\/SearchInput').fill(term);
      await page.getByTestId('\\@web\\/Search\\/SearchInput').press('Enter');

      // just go to the first result; we don't care which specific product right now
      await page.locator('[data-test="product-grid"] div')
        .filter({ hasText: term })
        .nth(2) // 2nd because the 1st is a list of filters
        .click();
  
      const originalPrice = await page.getByTestId('product-price').textContent();
      //const originalName = await page.getByTestId('product-title').textContent();
  
      // set to shipping because in-store wants you to sign in
      const isInStores = await page.getByText("This item isn’t sold in stores").isVisible()
      if (!isInStores) {
        await page.getByTestId('fulfillment-cell-shipping').click();
      }

      await page.getByTestId('shippingButton').click();    
      await page.getByRole('button', { name: 'View cart & check out' }).click();
    
      const priceInCart = await page.getByTestId('cart-summary-subTotal').textContent();
      //const nameInCart = await page.getByTestId('cartItem-linked-title').textContent();
  
      //expect(nameInCart).toEqual(originalName);
      expect(priceInCart).toContain('1 item');
      expect(priceInCart).toContain(originalPrice);

      await context.close();
    });
  });
})