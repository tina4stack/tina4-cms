blockManager.add('bs-accordion', {
    category: 'Bootstrap - Accordion',
    label: 'Accordion Base',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M10.23 10.4h24.04M10.23 34.1h24.04" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/><rect width="33.42" height="13.1" x="5.54" y="15.7" rx="3.48" ry="3.48" style="fill:none;stroke:#515962;stroke-dasharray:0 0 2.07 5.18;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/></svg>
    `,
    content: `<div class="accordion"></div>`
});

blockManager.add('bs-accordion-item', {
    category: 'Bootstrap - Accordion',
    label: 'Accordion Item',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M10.23 10.4h24.04M10.23 34.1h24.04" style="fill:none;stroke:#515962;stroke-dasharray:0 0 2 5;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/><rect width="33.42" height="13.1" x="5.54" y="15.7" rx="3.48" ry="3.48" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/><path d="m28.39 20.97 2.57 2.56 2.57-2.56M22.58 22.25H10.86" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/></svg>
    `,
    content: `<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>`
});