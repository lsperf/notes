# This repo represents search and replace tasks implemented on an existing git project https://github.com/AnomalyInnovations/serverless-stack-demo-client

- Filter notes. Allows the user to find notes containing a specific spring.
- Bulk find-and-replace. Allows the user to replace all occurrences of a given string (in this case - search string) across all saved notes, with a new string supplied by the user.
- Loading indicator. The indicator appears while all the notes are being retrieved from the API for the homescreen, when an individual note is being loaded for viewing, and when find-and-replace is in progress.

# Serverless Stack Demo React App

The [Serverless Stack Guide](http://serverless-stack.com) is a free comprehensive resource to creating full-stack serverless applications. We create a [note taking app](http://demo2.serverless-stack.com) from scratch.

This repo is for the frontend React app that we build over the course of the tutorial. You can find the repo for the backend serverless API [here](https://github.com/AnomalyInnovations/serverless-stack-demo-api). And the repo for the tutorial [here](https://github.com/AnomalyInnovations/serverless-stack-com).

#### Steps

To support the different chapters and steps of the tutorial; we use branches to represent the project codebase at the various points. Here is an index of the various chapters and branches in order.

- [Initialize the Frontend Repo](../../tree/initialize-the-frontend-repo)
- [Configure AWS Amplify](../../tree/configure-aws-amplify)
- [Redirect on Login](../../tree/redirect-on-login)
- [Create a Build Script](../../tree/create-a-build-script)

#### Usage

This project is created using [Create React App](https://github.com/facebookincubator/create-react-app).

To use this repo locally, start by cloning it and installing the NPM packages.

``` bash
$ git clone https://github.com/AnomalyInnovations/serverless-stack-demo-client
$ npm install
```

Run it locally.

``` bash
$ npm run start
```

---

This repo is maintained by [Serverless Stack](https://serverless-stack.com).

[Email]: mailto:hello@serverless-stack.com
