# prototype
## Installation
1. Install [Meteor](https://www.meteor.com) (preferably on Mac/Linux)
2. Run command `meteor`in app root dir.
3. In case of errors, run the proposed `meteor install` commands in app dir.
4. Go to localhost:3000 in browser (tested with Safari/Chrome).

## App overview
Simple Meteor app using dummy json data file. Blaze templates with D3.js visualisations.

![ScreenShot](https://raw.githubusercontent.com/svencharleer/vdab_prototype1/master/screenshots/v1.png)

Click on a job graph to show detailed parameter data. Click on cross (hover over small dot to hide job). Select recommendations to update main visualisation.

## Structure
All relevant client scripts are in the `client`directory. Start with main.(html|js|css). In the HTML file, every `{{> NAME }}` refers to a new Blaze template within the file or within the directory of the same name. `{{NAME}}` refers to helper functions in the JavaScript file matching the html file/template name.

## Files
`/private/data.json`
Example of current data format client-side.

`/client/`
All client code

`/client/main.html|js|css`
Main template for index page

`/client/checkbox/*`
Simple checkbox template

`/client/circlGraph/*`
Template to visualise circle shaped graph at top

`/client/circlGraphWrapper/*`
Template to pass data to circle shaped graph

`/client/parameter/*`
Template to visualise entire parameter incl. distribution graph and recommendations (Stefan's labs)

`/client/parameterGraph/*`
Template to visualise distribution of 1 parameter. Currently expects the data to be sampled in 10 intervals. This is all temporary as I need to analyse the new data from Stefan and see how we can convert that.

`/client/parameterGraph2/*`
Same as above, just another visualisation attempt.

`/client/parameterGraphWrapper/*`
Template to pass the data to the graph above.

`/client/recommendations/*`
Template to list all recommendations of specific parameter (also not possible yet as we do not have the link between recommendations and parameter).
