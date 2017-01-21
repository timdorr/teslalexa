# Teslalexa [![npm][npm-badge]][npm]

Control your Tesla from Alexa. Uses the [Tesla JSON API](https://github.com/timdorr/model-s-api).

## Prerequisites

- [NodeJS](https://nodejs.org/) (4.3 or higher)
- An [AWS (Amazon Web Services) account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html)
- An [Amazon Developer account](https://developer.amazon.com/edw/home.html)

## Install

I'm looking to automate this with CloudFormation in the future. PRs are appreciated!

1. Go to the [Releases tab](https://github.com/timdorr/teslalexa/releases) and download the zip or tar.gz of the latest release.
2. Unzip to somewhere and open up a terminal console in that location.
3. Run `npm install` to obtain any dependencies.
4. In AWS, [create a function in Lambda](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/select-blueprint):
  1. Choose the Blank Function blueprint.
  2. Select Alexa Skills Kit as your trigger.
  3. Name the function TeslaControl and make sure the Runtime is Node 4.3.
  4. Leave the code section alone.
  5. Set the following Environment Variables:
    - TESLA_EMAIL - Your tesla.com email address
    - TESLA_PASS - Your tesla.com password
    - TESLA_VIN - The VIN of the vehicle you want to control
    - TESLA_CLIENT_ID - You can get these two [here](http://pastebin.com/fX6ejAHd)
    - TESLA_CLIENT_SECRET
  6. Under Role, Create a new role from a template. Name it TeslaControl and choose the Simple Microservice permission.
  7. Create the function and grab the ARN from the top right of the screen.
  8. Head over to [the IAM section](https://console.aws.amazon.com/iam/home) of the AWS Console and go to Roles.
  9. Select the TeslaControl role and click on the policy that starts with `AWSLambdaMicroserviceExecutionRole-`.
  10. Edit the policy and change the Action section it so it reads:
  ```json
  "Action": [
      "dynamodb:*"
  ]
  ```
  11. Validate the policy to be sure it's right and Save it.
5. In the Amazon Developers Console, [create a new Alexa skill](https://developer.amazon.com/edw/home.html#/skill/create/):
  1. The Skill Type is Custom Interaction Model, you can name it whatever you want, and the Invocation Name should be "my car" ("my Tesla" will also work. I wouldn't recommend "my Model S")
  2. In the Interaction Model tab, copy the contents of `intents.json` into the Intent Schema, and `utterances.txt` into the Sample Utterances box.
  3. Create two Custom Slot Types:
    - LOCK_UNLOCK
    ```
    lock
    unlock
    ```
    - START_STOP
    ```
    start
    stop
    ```
  4. On the Configuration tab, choose the AWS Lambda ARN as Service Endpoint Type, region of North America, and enter the ARN from the AWS Lamda function you created.
  5. On the Test tab, it should be enabled for testing on your account.
  6. Grab the ID at the top of the page (starts with ` amzn1.ask.skill`).
6. Head back to the AWS Lambda function you created and add a new APP_ID environment variable with the Skill ID you just copied.
7. Back in the Amazon Developer Console, you should be able to test with an utterance of "Tell my car to log in" and get back some code that says something about being logged in.
8. Also run "Tell my car to get vehicle" to make sure it can find your vehicle.

[npm-badge]: https://img.shields.io/npm/v/teslalexa.svg?style=flat-square
[npm]: https://www.npmjs.org/package/teslalexa
