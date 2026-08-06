import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-header-megamenu";

const content = html`
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
  </ul>
</ilw-header-megamenu>
`;

test("renders slotted navigation role", async () => {
    const screen = render(content);
    const element = screen.getByRole("navigation", {name: 'Header Menu Navigation'});
    await expect.element(element).toBeInTheDocument();
});
