# DomainTools

## Why use the DomainTools Looker Block?

**(1) Threat Hunting** - Provides direct access to DomainTools’ industry-leading threat intelligence data, predictive risk scoring, and critical tactical attributes to gain situational awareness of malicious domains inside your organization. DomainTools enables Security Operations Centers (SOCs) and security analysts to take domain observables from their network and connect them with other active domains on the Internet.

**(2) Centralized Place for Analysis** - Proactive monitoring of domain indicators and tags originating from DomainTools Iris Investigate and Iris Detect in a centralized location.

**(3) Empowering Enriched Domain Information** - The Domain Profiling dashboard offers a breakdown of enriched domains based on various criteria, including IPs, Registrars, and Server Types.

## Block Structure

For more information on the Block structure and customization, refer to [Looker Marketplace Documnetation](https://docs.looker.com/data-modeling/marketplace/customize-blocks#marketplace_blocks_that_use_refinements)

## Technical installation

### Pre-requisites

- This block works with Chronicle datasets in Google BigQuery.
- BigQuery Export feature needs to be enabled for your Chronicle tenant. (Reach out to your Chronicle representative to set this up.)
- Admin Role User - to create a database connection and install block from the marketplace

## Installation steps (GitHub)

### Create a Chronicle connection
1. To create a connection to Google Chronicle, first open the Looker instance and navigate to the Home page.
2. Now open the main menu, select Admin, and then go to the Connection page.
3. Now click on the Add connection to create a new connection.
4. Enter the name of the connection as you prefer and select Google BigQuery Standard SQL in the Dialect. Now several new fields will appear.
5. Enter Billing Project ID field where Chronicle data is present.
6. Enter the relevant Dataset name (datalake).
7. To configure authentication, select the service account method and upload your Chronicle service account file.
8. In the optional settings, set both the timestamps (Database timestamp and query timestamp) as UTC (the time fields shown in dashboards will be populated accordingly).
9. Click on the Connect button to complete the connection setup. Looker is now connected to the Google Chronicle database.

### Get the Block from GitHub Repository
1. Fork this DomainTools repository. Make sure to uncheck the option for fork only the main branch.
2. Go to Looker and turn on “Development Mode” from the sidebar panel.
3. Select Projects from the Develop menu.
4. From the LookML Projects page, select New LookML Project to open the New Project page.
5. On the New Project page, configure these options for your new project:
   - **Project Name**: Give project name ‘domaintools_dashboards’
   - **Starting Point**: Select Blank Project.
   - Click on Create Project. The project will be created and opened in the Looker IDE.
6. Click on the Settings icon from the navigation bar, and open the Configure Git page by selecting the Configure Git button.
7. In Looker's Configure Git section, paste the URL of the for forked DomainTools Looker Dashboard Git Repository in the Repository URL field, then select Continue.
8. Enter the github username and Personal Access Token, then click “Test and Finalize Setup”.
9. If you get an error like “Ensure credential allow write access failed”, just enter the username and token again and click “Skip Tests and Finalize Setup”.
10. Click on the git action tab and select ‘develop-dashboards-production’ branch in the current branch.
11. Now, you should be able to see the code. If not do the following:
    - In the ‘Git Actions’ tab from the left side, click on the “Pull from…” option.
    - Select the “Pull From Remote (develop-dashboards-production)” option and click on the Confirm button.
12. Click on the ‘File Browser’ tab from the left side, click on ‘manifest.lkml’, enter the value of the following constants and then click “Save Changes”.
    <a id="variables"></a>
    - **CONNECTION_NAME**: Name of the database connection for the Chronicle dataset in BigQuery.
    - **CHRONICLE_URL**: Enter the base URL of your Chronicle console tenant, for e.g. https://your-tenant.backstory.chronicle.security
    - **GOOGLE_CLOUD_FUNCTION_NAME**: Enter the name of the cloud function.
    - **GOOGLE_CLOUD_FUNCTION_REGION**: Enter the name of the cloud function region. List of regions can be found at https://cloud.google.com/functions/docs/locations
    - **GOOGLE_CLOUD_PROJECT_ID**: Enter the name of the cloud function project id. Find Project ID https://support.google.com/googleapi/answer/7014113?hl=en
13. In the Git Actions, click on the “Commit” to push changes to the repository and then click “Deploy to Production”:
    - Note: ‘Deploy to Production’ will push code to the production branch that is set in the project settings. By default, it will be the ‘main’ branch. If you don’t want to push code to ‘main’ branch, then create your own branch and set it to ‘Git Production Branch Name’ in project settings. Then click on Deploy to Production.
14. On the Homepage of your Looker instance, navigate to the “LookML dashboards” tab under the “Folders” tab to access and view all the dashboards.

## Installation Steps (Marketplace)
Currently Block is not published on marketplace, please use steps from getting the block from GitHub Repository.

1. After a successful connection click on the ‘marketplace’ button in the top-right corner.
2. Click on “Discover”. It will open a Looker marketplace.
3. Search “DomainTools”, it will open the page for installation.
4. Click on “install+”.
5. Select “Install” And “Accept”  terms and conditions.
6. Click on Agree and Continue.
7. Select Connection Name from the dropdown and enter [other values](#variables).
8. After Successful installation, the user will be able to see the DomainTools block under Home => Blocks.


## What if I find an error? Suggestions for improvements?

Great! Blocks were designed for continuous improvement through the help of the entire DomainTools community and we'd love your input. To report an error or suggest recommendation regarding this block, please reach out to DomainTools support https://domaintools.com/support/.
