# LTI 1.3 plugin Canvas integration example

> Repository describes and provides an example plugin on how a Learning Management System (LMS) can be extended with your own plugins using LTI 1.3 Advanced. In this example Canvas LMS is used.

There are several ways to extend an LMS with your own plugins and functions. A popular option is to extend an LMS using LTI plugins. LIT is a standard used by many LMS (such as Moodle, Canvas, ...). With LTI, a learning module can be expanded to include its own functionalities. The LTI extension is a completely independent web application that interacts and communicates with the LMS.
In this example, LTI Advanced (LTI 1.3) was used to integrate an example plugin into the Canvas learning platform.
The Canvas Instance is a separate hosted instance and is therefore not hosted by Instructure.
This is important to mention, since there are differences in configuration files for the operation of LTI 1.3 that have to be adjusted for a self-hosted instance.

## Table of Contents

- [1. Technologies](#1-technologies)
- [2. Setting up Canvas LMS](#2-setting-up-canvas)
- [3. Create developer key for external LTI app](#3-create-developer-key-for-external-lti-app)
- [4. Install LTI app inside Canvas](#4-install-lti-app-inside-canvas)
- [5. Use LTI plugin inside Canvas](#5-use-lti-plugin-inside-canvas)
- [6. How to use and set up the example LTI app](#6-how-to-use-and-set-up-the-example-lti-app)

---

## 1. Technologies

The developed LTI 1.3 plugin example is an independent full stack web application.
The following technologies were used:
- ReactJs (Frontend)
- Nodejs (Backend); with [ltijs](https://github.com/Cvmcosta/ltijs) as library for LTI 1.3 integration
- MongoDB Database


The development of the LTI app is splitted in a client and a server folder.

> client -> Frontend

> server -> Backend

The example application in this repository builds on top of [ltijs](https://github.com/Cvmcosta/ltijs) and creates a small quiz that sends the grades back to Canvas and stores them there.


If you are experienced with LTI and just want to try out the LTI plugin quickly, you can skip to step 6 [How to use and set up the example LTI app](#6-how-to-use-and-set-up-the-example-lti-app).

However, I recommend reading through all points thoroughly, as there are several difficulties with integrating LTI with Canvas.


---

## 2. Setting Up Canvas

There are several ways to set up a Canvas instance.
If LTI plugins are to be used in the set-up instance, [Production-Start](https://github.com/instructure/canvas-lms/wiki/Production-Start) from Canvas is recommended. Another way is that the Canvas instance is directly hosted by [Instructure](https://www.instructure.com/).
However, the quick start guide provided by the Canvas LMS should not be used, as problems with LTI 1.3 can occur there.
To test this plugin, a separate instance was hosted on an Ubuntu 20.04 server, which was set up with the help of the Production Start Guide.

| :point_up: Important |
|-------------------------------------|
> For a Canvas instance on an Ubuntu server, at least 8 GB of Canvas RAM is recommended. So use a server that has at least 8 GB of RAM.

### Important LTI configuration for own Canvas instances

> This error only occurs with self-hosted instances, which are not managed by Instructure

Because when you try to launch a LTI 1.3 plugin in Canvas you get a 500 server error which says "undefined method `sign' for nil:NilClass"

Although Canvas was set up correctly, no LTI plugin can be integrated. This is because important configuration files for LTI are missing or misconfigured.
Unfortunately, this step is not properly explained in the Canvas documentation.

To fix this problem follow this steps:

1. Look if you have an dynamic_settings.yml file in your canvas/config directory
2. If you do not have one than copy the example file which might be in canvas/config/dynamic_settings.yml.example.
3. Rename that file to dynamic_settings.yml.
4. If you do not have that file in the canvas/config you can get that file from [here](https://raw.githubusercontent.com/instructure/canvas-lms/master/config/dynamic_settings.yml.example).
5. Copy the file and paste in at canvas/config.
6. Change the word development: to production: inside the dynamic_settings.yml file
7. After that restart your web server. For Apache use:
    `sudo /etc/init.d/apache2 restart`

After these steps, the LTI plugin should be loaded and displayed in Canvas.

Another explenation could be found in [this post](https://community.canvaslms.com/t5/Canvas-Developers-Group/Canvas-LTI-1-3-Error-Unknown-Key-Type/m-p/390285/highlight/true#M6345) from the Canvas Community forum.



---

## 3. Create developer key for external LTI app

If a new LTI 1.3 plugin is integrated into Canvas, a new developer key must first be created. This is needed for the external app to interact with Canvas.

So a new "LTI Developer Key" has to be created under the *admin panel* of Canvas. See the screenshots below.

- Admin -> SiteAdmin -> Developer keys

So initially only admins can create developer keys and therefore only admins can integrate a new external LTI app.
However, once a developer key has been created, this plugin can be used in various places, not only by admins but also, for example, by course creators.

![Developer keys](./zdoc/img/developer_key.png 'Developer keys')

When creating a new developer key, a new window opens. The external tool must be configured in the window. Important data is queried there via the external LTI tool. Here it is important that the URLS are correct so that the communication between Canvas and the LTI Plugin can work.

Here is an example of a completed LTI developer key configuration:

![Developer keys](./zdoc/img/developer_key_example_setup.png 'Developer keys')

| :exclamation:  Important   |
|-----------------------------------------|

> Canvas only allows embedding LTI 1.3 plugins which are loaded over HTTPS. This can sometimes be difficult for development purposes, since you don't want to redeploy the plugin on a server with every change. That's why I recommend a tunnel like [Nkrog](https://ngrok.com/) for development purposes, which makes your own local host accessible from the outside via an https url.


> It is important that if the LTI plugin is to have certain functions, such as sending notes to Canvas, this feature must be activated in the configuration under "LTI Advantage Services". If these functions are not activated here, the external tool does not have these permissions and, for example, no notes can be sent to Canvas.



After the key has been created, it must be set to the "on" status so that the key works correctly. 

After a developer key has been created for the LTI plugin, the plugin can be added to Canvas as an external app, how this works is described in the next section


---

## 4. Install LTI app inside Canvas

The following shows how an LTI app is installed in Canvas. It is important that the third step (Create developer key for external LTI app) has been carried out beforehand.

> Canvas allows LTI plugins to be integrated globally (for all courses) or only for individual courses.
This can be done either via the admin options of the admin account, or via the settings of the respective course. However, the procedure for embedding is the same.


Global (for all courses):

- Admin -> SiteAdmin -> Settings -> Apps

Local (only for one course):

- Example Course -> Settings -> Apps

In both options you get to the fact that you can add an app. See the screenshot below.

![Add LTI app](./zdoc/img/add_lti_app.PNG 'Add LTI app')

Click on +App and a new window opens in which you can integrate the external app.

![Add LTI app cientid](./zdoc/img/add_lti_app_clientid.PNG 'Add LTI app cientid')

Select that you add the new app via the Client ID.
This ID is found by the creation from the LTI Developer key. In this example the ID is: “10000000000001” (Look at previous screenshot).
Then click further and install the plugin.

After the installation has worked, the plugin can be used within Canvas. Depending on whether it was integrated globally or locally, it can be used in every course or only in a specific one.

---

## 5. Use LTI plugin inside Canvas

The previously installed external LTI plugin can now be inserted and used by lecturers in several courses.

To integrate the plugin, a new course must be created.
A *module* must be created within this course.
*External tool* must be selected in the module and the previously registered LTI 1.3 plugin can be integrated there and should be available for selection here.
If everything is configured correctly, the LTI plugin should then be displayed at this point in the course and the students can use it to learn.

It is important to note here that if an LTI plugin is inserted via *module -> External Tool*, it cannot be used to send notes to Canvas. An extra step must be taken for this.
Plugins that are inserted above are therefore not authorized to send grades, instead these LTI plugins can only visually reproduce the content or carry out ungraded quizzes.

So that LTI plugins can also send school grades, an assignment must first be created using the LTI plugin.
After this assignment has been created, this assignment can be added within a new module.
Once this is done, the LTI plugin can also send sheet music to cavas.
It is therefore important to ensure that the LTI plugin is integrated in the right place in Canvas


| :exclamation:  Important   |
|-----------------------------------------|

> It is important to know that the *Student view* as a course administrator is not sufficient to check the grading of the LTI plugin.
For this purpose, an actual second student account must be created to carry out this graded course.
That means a student account has to be created and the created course has to be assigned to this student so that he can access the graded LIT plugin.
If you try to use the graded LTI plugin as a course administrator in the *Student view*, an error message appears.

---

## 6. How to use and set up the example LTI app

> Nodejs must be installed on your system

First clone the repository for example with `git clone` or download the zip.

> To get the LTI plugin to work only the backend (server folder) is the importaint one. If you want to make changes than you also have to edit the frontend (client folder).

#### For Frontend develompment:

Navigate into the client folder with 

`cd client` and make `npm install` inside that folder. 

After that start the development server for the frontend with `npm start`.

If you want to make a new build from the frontend run `npm build`.

> Note that the new build must be copied and placed inside the `server/public` folder. This is the only location where the LTI frontend is stored. So the client folder is only for development.


#### Backend (Real LTI Plugin):

> MongoDB must be installed beaucse there will the configs and keys from the plafrom stored

Navigate into the server folder with

`cd server` and make `npm install` inside that folder.

Set up the `.env` file (copy example.env and remane the file)

```
DB_HOST=localhost 
DB_NAME=ltidb
DB_USER=user
DB_PASS=pass
LTI_KEY=LTIKEY
```

Register the used plattform correct inside the `index.js` file. (Canvas Exmaple)

> If you want to use this LTI plugin example in another LMS like moodle it will work but you have to register the plugin with other configurations.

```
  /**
   * Register platform
   */
  await lti.registerPlatform({
    url: 'https://canvas.instructure.com',
    name: 'exampledomain',
    clientId: '10000000000001',
    authenticationEndpoint: 'https://canvas.exampledomain.com/api/lti/authorize_redirect',
    accesstokenEndpoint: 'https://canvas.exampledomain.com/login/oauth2/token',
    authConfig: { method: 'JWK_SET', key: 'https://canvas.exampledomain.com/api/lti/security/jwks' }
  })
```
- `url` where is the Canvas instance hosted
- `name` domainname from hosted instance
- `clientId` id from Canvas for lti plugin (check step 3 [Create developer key for external LTI app](#3-create-developer-key-for-external-lti-app))
- `authenticationEndpoint` Endpoint for lit
- `accesstokenEndpoint` Endpoint for oauth token
- `authConfig` key url


After that start the development server for the backend with `npm start`.


> For local development [Nkrog](https://ngrok.com/) is recomended because Canvas does not allow to load lti plugins over http or from the localhost.


If everything is set up correctly the Lti plugin should be shown up inside Canvas.

---

Special thanks to [@Cvmcosta](https://github.com/Cvmcosta) (Inventor of ltijs) which helped me a lot with integreating ltijs with grades to Canvas.
