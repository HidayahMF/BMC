## TODO - Hero CTA navigation + placeholder routes

- [ ] Update `frontend/src/sections/Home.jsx`
  - [ ] Add `link` property to each object in `slides`
  - [ ] Make CTA button call `navigate(slide.link)` (no hardcoded destinations)
  - [ ] Preserve existing hero animation/design logic

- [ ] Create placeholder pages (modern industrial design, responsive, reusable)
  - [ ] `frontend/src/pages/ProductsPage.jsx` for `/products`
  - [ ] `frontend/src/pages/MarketsPage.jsx` for `/markets`
  - [ ] `frontend/src/pages/ExportsPage.jsx` for `/exports`
  - [ ] `frontend/src/pages/AboutPageFull.jsx` for `/about`

- [ ] Wire routing
  - [ ] Update `frontend/src/App.jsx` to add routes for `/products`, `/markets`, `/exports`, `/about`

- [ ] Verify
  - [ ] Build/run frontend to ensure routing works and no animation logic was modified

