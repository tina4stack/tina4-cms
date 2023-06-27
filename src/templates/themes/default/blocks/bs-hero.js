blockManager.add('bs-hero-centered', {
    category: 'Bootstrap - Heroes',
    label: 'Hero - Centered',
    media: `
    `,
    content: `<div  class="px-4 py-5 my-5 text-center">
                                                <img class="d-block mx-auto mb-4" src="" alt="" width="72" height="57">
                                                <h1 class="display-5 fw-bold text-body-emphasis">Centered hero</h1>
                                                <div class="col-lg-6 mx-auto">
                                                  <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                                  <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                                    <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                                                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                                                  </div>
                                                </div>
                                              </div>
    `
});


blockManager.add('bs-hero-dark', {
    category: 'Bootstrap - Heroes',
    label: 'Hero - Dark',
    media: `
    `,
    content: `<div class="bg-dark text-secondary px-4 py-5 text-center">
                                                <div class="py-5">
                                                  <h1 class="display-5 fw-bold text-white">Dark color hero</h1>
                                                  <div class="col-lg-6 mx-auto">
                                                    <p class="fs-5 mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                                      <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                                                      <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>`
});

blockManager.add('bs-hero-left', {
    category: 'Bootstrap - Heroes',
    label: 'Hero - Left',
    media: `
    `,
    content: `<div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
            <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700"
                 height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's
                most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system,
                extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
        </div>
    </div>
</div>`
});

blockManager.add('bs-hero-shadow', {
    category: 'Bootstrap - Heroes',
    label: 'Hero - Shadows',
    media: `
    `,
    content: `<div class="container my-5">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's
                most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system,
                extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Primary</button>
                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
        </div>
        <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img class="rounded-lg-3" src="bootstrap-docs.png" alt="" width="720">
        </div>
    </div>
</div>`
});