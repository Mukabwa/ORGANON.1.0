# Shell revision 01

This revision makes the sidebar and main content independent scrolling entities.

- Sidebar: `height: 100vh; overflow-y: auto`
- Main content: `height: 100vh; overflow-y: auto`
- Shell: `height: 100vh; overflow: hidden`
- Sidebar bottom identity is currently user name + quote.
- Logout is a separate control at the bottom.
- Profile navigation is intentionally omitted because V3 does not currently have a profile page.
