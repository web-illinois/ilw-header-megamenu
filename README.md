# ilw-header-megamenu

Links: **[ilw-header-megamenu in Builder](https://builder3.toolkit.illinois.edu/component/ilw-header-megamenu/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

An Illinois Mega Menu utilizes the standard design of the header menu, including the ability to have a link and toggle dropdown or just a static label with toggle dropdown. The difference will be the dropdown takes up the full-width of the container maxing out at 1270px, slightly exceeding the length of the main nav bar items. Each dropdown section has a maximum of 4 columns, evenly spaced with a diving bar between each.

The mega menu is not suited for more than 1 layer of nested lists, if you require more, use the original ilw-header-menu with nested ilw-header-menu-sections instead (flyout menu).

---------

The ilw-header-megamenu should contain an unordered list. Each list item can contain one of three items:

- a simple link or button (`<a>` or `<button>`)
- an <ilw-header-megamenu-section> that contains a span and at least one unordered list of links. The span should contain `slot="label"`.
- an <ilw-header-megamenu-section linked="true"> that contains an anchor and at least one unordered list of links. The anchor should contain `slot="link"`.

Within each `ilw-header-megamenu-section` or `ilw-header-megamenu-section linked="true"` you can choose:
- a basic unordered list of less than 20 links and no nesting. Each list item will be divided into groups of 5 or less. Adding more than 20 items will result in missing links.

OR a `<div>` containing:
- four seperated lists of links with nesting. Each new list will become it's own column. You can have as many list items as you want using this method. Note that items spanning more than four columns can result in wrapped columns.
Optional secondary items - each secondary item will be placed on the far right column, unless left attribute is added. 
- a decorative image
- a `<span>` containing a paragraph element and a call to action (`<a>` or `<button>`). The span should contain `slot="action"`.

The intention is to only use one secondary item, a decorative image or call-to-action, per dropdown. Repeating the same call-to-action in other dropdowns is not advised. You can use multiple lists. 

## Attributes

`width`: the numeric pixel width where it will change to the hamburger menu. This is defaulted to 990, but may be changed if you have a ridiculous menu.
`compact`: a boolean value that will force the menu to be a hamburger menu. Before using this option, see Accessibility Notes and Use for more information.

## Classes
`align-left`: aligns your secondary item to the far left column
`span-2`: allows your secondary item to span 2 columns
`span-3`: allows your secondary item to span 3 columns

## Code Examples

```html
<ilw-header-megamenu slot="navigation">
    <ul>
    <li>
      <ilw-header-megamenu-section linked="true">
          <a slot="link" href="/">Basic top links, no groups or nesting</a>
         
          <ul>
            <li><a href="/">Undergrad Admissions</a></li>
            <li><a href="/">Graduate Admissions</a></li>
            <li><a href="/">International Admissions</a></li>
            <li><a href="/">Degrees</a></li>
            <li><a href="/">Certificates</a></li>
            <li><a href="/">Online Programs</a></li>
            <li><a href="/">Research Focus Areas</a></li>
            <li><a href="/">Find a mentor</a></li>
            <li><a href="/">Degrees</a></li>
            <li><a href="/">Certificates</a></li>
            <li><a href="/">Online Programs</a></li>
            <li><a href="/">Undergrad Admissions</a></li>
            <li><a href="/">Graduate Admissions</a></li>
          </ul>
         
        </ilw-header-megamenu-section>
       </li>
      <li>
        <ilw-header-megamenu-section>
          <span slot="label">Four columns, destinct groups with some nesting and a vanilla image</span>
          <div>
            <!-- column 1 -->
              <ul>
                <li><a href="/">Undergrad Admissions</a>
                      <ul>
                        <li><a href="/">Apply</a></li>
                        <li><a href="/">Majors</a></li>
                        <li><a href="/">Cost and Aid</a></li>
                      </ul>
                </li>
                <li><a href="/">Graduate Admissions</a>
                        <ul>
                        <li><a href="/">Apply</a></li>
                        <li><a href="/">Majors</a></li>
                        <li><a href="/">Cost and Aid</a></li>
                      </ul>
                </li>
                <li><a href="/">International Admissions</a></li>
              </ul>
              <!-- column 1 -->
              <!-- column 2 -->
                <ul>
                  <li><a href="/">Degrees</a></li>
                  <li><a href="/">Certificates</a></li>
                  <li><a href="/">Online Programs</a></li>
                </ul>
              <!-- column 2 -->
              <!-- column 3 -->
                <ul>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a>
                      <ul>
                        <li><a href="/">Degrees</a></li>
                        <li><a href="/">Certificates</a></li>
                        <li><a href="/">Online Programs</a></li>
                        <li><a href="/">Research Focus Areas</a></li>
                      </ul>
                  </li>
                  <li><a href="/">Find a mentor</a></li>
                  <li><a href="/">Student Handbook</a></li>
                </ul>
              <!-- column 3 -->
              <!-- column 4 -->
            <ul>
              <li><a href="/">Undergrad Admissions</a></li>
              <li><a href="/">Graduate Admissions</a></li>
              <li><a href="/">International Admissions</a>
                <ul>
                  <li><a href="/">Degrees</a></li>
                  <li><a href="/">Certificates</a></li>
                  <li><a href="/">Online Programs</a></li>
                  <li><a href="/">Research Focus Areas</a></li>
                </ul>
              </li>
            </ul>
             <!-- column 4 -->
          </div>
        </ilw-header-megamenu-section>
      </li>
      <li>
          <ilw-header-megamenu-section>
              <span slot="label">Links, with decorative image aligned left</span>
              <div>
              <ul>
                <li><a href="/">Undergrad Admissions</a></li>
                <li><a href="/">Graduate Admissions</a></li>
                <li><a href="/">International Admissions</a></li>
                <li><a href="/">Degrees</a></li>
                <li><a href="/">Certificates</a></li>
              </ul>
              <ul>
                <li><a href="/">Undergrad Admissions</a></li>
                <li><a href="/">Graduate Admissions</a></li>
                <li><a href="/">International Admissions</a></li>
                <li><a href="/">Degrees</a></li>
                <li><a href="/">Certificates</a></li>
              </ul>
              <ul>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a>
                      <ul>
                        <li><a href="/">Degrees</a></li>
                        <li><a href="/">Certificates</a></li>
                        <li><a href="/">Online Programs</a></li>
                        <li><a href="/">Research Focus Areas</a></li>
                      </ul>
                  </li>
                  <li><a href="/">Find a mentor</a></li>
                  <li><a href="/">Student Handbook</a></li>
                </ul>
              <img class="align-left" src="https://fastly.picsum.photos/id/1025/500/400.jpg?hmac=MPFZjsU2UG1Mr3SjMkYP2F9jnhQWyatt6soxbOj0TN4" alt="">  
            </div>
            </ilw-header-megamenu-section>
      </li>
        <li>
          <ilw-header-megamenu-section>
              <span slot="label">Links with image call to action</span>
              <div>
                <ul>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a>
                      <ul>
                        <li><a href="/">Degrees</a></li>
                        <li><a href="/">Certificates</a></li>
                        <li><a href="/">Online Programs</a></li>
                        <li><a href="/">Research Focus Areas</a></li>
                      </ul>
                  </li>
                  <li><a href="/">Find a mentor</a></li>
                  <li><a href="/">Student Handbook</a></li>
                </ul>
                 <span  slot="action" class="span-3">
                  <p> Prospective students </p>
                  <button class="ilw-button ilw-theme-orange-2">Link 2</button>
                  <img src="https://picsum.photos/id/37/300/300" alt="">  
                </span>
                
              </div>
            </ilw-header-megamenu-section>
</li>
<li>
            <ilw-header-megamenu-section>
              <span slot="label">Links with plain call to action</span>
              <div>
                <ul>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a></li>
                  <li><a href="/">Degrees</a></li>
                  <li><a href="/">Certificates</a></li>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a></li>
                  <li><a href="/">Degrees</a></li>
                  <li><a href="/">Certificates</a></li>
                </ul>
                <ul>
                  <li><a href="/">Undergrad Admissions</a></li>
                  <li><a href="/">Graduate Admissions</a></li>
                  <li><a href="/">International Admissions</a>
                      <ul>
                        <li><a href="/">Degrees</a></li>
                        <li><a href="/">Certificates</a></li>
                        <li><a href="/">Online Programs</a></li>
                        <li><a href="/">Research Focus Areas</a></li>
                      </ul>
                  </li>
                  <li><a href="/">Find a mentor</a></li>
                  <li><a href="/">Student Handbook</a></li>
                </ul>
                 <span  slot="action" class="span-2 align-left">
                  <p> Prospective students </p>
                  <button class="ilw-button ilw-theme-orange-2">Link 2</button>
                </span>
                
              </div>
            </ilw-header-megamenu-section>
      </li>
    </ul>
 </ilw-header-megamenu>
```

## Usability
When creating menus, do not include all your links inside the menu. Just focus on the high-level links, and rely on breadcrumbs and side menus for internal links. Having a large menu system reduces usability.

While it is tempting to hide your menu with the hamburger menu option, only do this if you have no other option. Hamburger menus harm usability because it hides the top-level categories and reduces the ability for users to browse to find what they want, especially for new users.

## Accessibility Notes and Use

Note from Keith: 
   - Navigation / Menus are unique in that most screen reader users will only expect linked items to exist inside of this element role. This means that any headings or static text should be avoided since they will likely be missed by this audience.

### Keyboard navigation
- While all dropdowns are closed: Use `Tab/Shift + Tab` or `left/right arrow keys` move the user across the top level navigation bar.
- Open a dropdown: Focus on the toggle button and press `enter` or `space`.
- Navigate an open dropdown: `Tab/Shift + Tab` or `down/up arrow keys` will go down/up the list. 
- Close an open dropdown: Click anywhere else on the screen, press `escape` to close and return focus to the corresponding toggle button or hitting the `Left/right arrow keys` will close the dropdown and go to the next item in the top level navigation bar.
- Focus stays on the same menu item when the browser changes sizes to switch between mega and hamburger menu

### ARIA
- Each toggle button will get the attributes: `aria-haspopup="true"`, `aria-expanded="true"`, `aria-controls="parent-name-menu"` and `aria-label="Toggle parent-name submenu`. The SVG will get `aria-hidden="true"`
- Each section will get a unique id and label, example: `id="parent-name-menu"` and `aria-label="About submenu"`
- For call to action items, the paragraph will get: `id="parent-name-action-text"` and the clickable element will receive `aria-describedby="parent-name-action-text"`.

## External References

See [ilw-header-menu documentation](https://github.com/web-illinois/ilw-header-menu)
