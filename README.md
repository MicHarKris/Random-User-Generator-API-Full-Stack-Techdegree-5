# Random-User-Generator-API-Full-Stack-Techdegree-5
 A randomly generated list of 12 employees, made by AJAX or Fetch requests

'For this project, you'll build an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.
You’ll use the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and use that data to build a prototype for an Awesome Startup employee directory.
You’ll request a JSON object from the API and parse the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.'

Includes;

API usage
- Full generation of a gallery list of 12 employees, that are assigned dynamically to the DOM, after a fetch call to the API at https://randomuser.me/api/?results=12&nat=us

User Directory
- The gallery appears as described in the Instructions, and structurally as is shown in the mockup.
- Exceeds: A search functionality, that allows the user to narrow down the gallery, by any search keyword that is included in the data fetch'ed about each employee listed.

Modal Window
- Modal cards that appear when the gallery items are selected, and displays further information about each user, as described in the instructions and structurally as is shown in the mockup. Can be closed by either pressing the X button on the screen, or the escape key on the keyboard.
- Exceeds: Navigation in the modal window, between the employees in the active list is working, and there are no errors at the beginning or end of the list.

Structure, Style and CSS
- The static elements of the page, resemble the mockup, and is structurally identical.
- Exceeds: Have added small fade-in/drop-down animations, added some drop-shadows to images and cards, and added some minor color-changes in the gallery.

Notes;
- The 'How You Will Be Graded' segment, is a bit confused about what the list fetched from the API actually represents; sometimes referring to them as Employees, sometimes Users, and sometimes even Students.