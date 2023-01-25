# Web Automation Challenge

```
As an e-commerce customer I want the cart/checkout experience to be flawless.

Recently some differences have been observed between quantity and total price in the checkout flow (between the Product Details Page, and the Checkout page).

These problems have caused an increase in support tickets and customers leaving the item in the cart and not finishing the purchase.
```

For a given list of search terms, the tests will go to `target.com` and run a search for that term, select a result, add it to the cart, and then make sure the item in the cart has the same price as the item seen on the storefront.

## Notes

Target helpfully uses a test ID attribute on all of the revelant elements so that has been configured in the `playwright.config.ts` file.

I wanted to also confirm the item in the cart was *actually* the item chosen in the storefront by comparing names, but sometimes the item in the cart will have the collor appended / prepended / inserted in the middle of the name, so I decided that problem was outside the scope of this take home test.

I've never used Playwright before, so there may be some nuances or idiomatic ways of doing things that I missed. The provided test works 100% of the time while running individually, or while debugging, but using `npx playwright test` to run the suite will invariably result in 2 or 3 tests timing out. I'm sure I can figure it out given time, but I've already spent an hour on this, so maybe someday someone more knowledgeable can help me out. :)