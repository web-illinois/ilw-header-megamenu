# ilw-header-megamenu

Links: **[ilw-header-megamenu in Builder](https://builder3.toolkit.illinois.edu/component/ilw-header-megamenu/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

An Illinois Mega Menu utilizes the standard design of the header menu, including the ability to have a link and toggle dropdown or just a static label with toggle dropdown. The difference will be the dropdown takes up the full-width of the container maxing out at 1240px, exceeding the length of the main nav bar items. Each dropdown section has a maximum of 4 columns, evenly spaced with a diving bar between each.

The mega menu is not suited for more than 1 layer of nested lists, if you require more, use the original ilw-header-menu with nested ilw-header-menu-sections instead (flyout menu).

---------

The ilw-header-megamenu should contain an unordered list. Each list item can contain one of three items:

- a simple link or button (`<a>` or `<button>`)
- an <ilw-header-megamenu-section> that contains a span and at least one unordered list of links. The span should contain `slot="label"`.
- an <ilw-header-megamenu-section linked="true"> that contains an anchor and at least one unordered list of links. The anchor should contain `slot="link"`.

Within each `ilw-header-megamenu-section` or `ilw-header-megamenu-section linked="true"` you can choose a combination of:
- 1-4 unordered list of links, with up to one layer of nested links. If only one list is added and it has more than 5 items, the remaining list items will be evenly divided between the remaining columns.
- a decorative image
- a `<div>` containing a paragraph element and a call to action (`<a>` or `<button>`). The div should contain `slot="action"`.

## Attributes

`width`: the numeric pixel width where it will change to the hamburger menu. This is defaulted to 990, but may be changed if you have a ridiculous menu.
`compact`: a boolean value that will force the menu to be a hamburger menu. Before using this option, see Accessibility Notes and Use for more information.
`span-2`: this will allow a secondary item to span 2 columns
`span-3`: this will allow a secondary item to span 3 columns


## Code Examples

```html
<ilw-header-megamenu slot="navigation">
    <ul>
    <li>
      <ilw-header-menu-section>
          <span slot="label">Basic links, no groups evenly divided</span>
          <ul>
            <li><a href="/">Undergrad Admissions</a></li>
            <li><a href="/">Graduate Admissions</a></li>
            <li><a href="/">International Admissions</a></li>
            <li><a href="/">Degrees</a></li>
            <li><a href="/">Certificates</a></li>
            <li><a href="/">Online Programs</a></li>
            <li><a href="/">Research Focus Areas</a></li>
            <li><a href="/">Find a mentor</a></li>
            <li><a href="/">Student Handbook</a></li>
            <li><a href="/">Career Center</a></li>
          </ul>
        </ilw-header-menu-section>
       </li>
      <li>
        <ilw-header-menu-section>
          <span slot="label">Four columns, destinct groups with some nesting</span>
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
          <ul>
            <li><a href="/">Degrees</a></li>
            <li><a href="/">Certificates</a></li>
            <li><a href="/">Online Programs</a></li>
          </ul>
          <ul>
            <li><a href="/">Research Focus Areas</a></li>
            <li><a href="/">Find a mentor</a></li>
          </ul>
          <ul>
            <li><a href="/">Student Handbook</a></li>
            <li><a href="/">Career Center</a></li>
          </ul>
        </ilw-header-menu-section>
      </li>
    </ul>
  </ilw-header-menu>
```

## Accessibility Notes and Use

Note from Keith: 
   - Navigation / Menus are unique in that most screen reader users will only expect linked items to exist inside of this element role. This means that any headings or static text should be avoided since they will likely be missed by this audience.

### Keyboard navigation
- While all dropdowns are closed: Use `Tab/Shift + Tab` or `left/right arrow keys` move the user across the top level navigation bar.
- Open a dropdown: Focus on the toggle button and press `enter` or `space`.
- Navigate an open dropdown: `Tab/Shift + Tab` or `down/up arrow keys` will go down/up the list. 
- Close an open dropdown: Press `escape` to close and return focus to the corresponding toggle button. `Left/right arrow keys` will close the dropdown and go to the next item in the top level navigation bar.


### ARIA
- Each toggle button will get the attributes: `aria-haspopup="true"`, `aria-expanded="true"`, `aria-controls="parent-name-menu"` and `aria-label="Toggle parent-name submenu`. The SVG will get `aria-hidden="true"`
- Each section will get a unique id and label, example: `id="parent-name-menu"` and `aria-label="About submenu"`
- Items with contextual information

## External References

See [ilw-header documentation](https://github.com/web-illinois/ilw-header-menu)
