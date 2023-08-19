# The Project
Sa3dni (spelled in Arabic as Help Me) is a Live Chat Support System Integration for online businesses, just like [ZenDesk Messaging](https://www.zendesk.com/) and [LiveChat](https://www.livechat.com).

## Project promo video
Here's a [promotional video](https://youtu.be/5ywDBj7l9_U) featuring the concept of the project and what could be offered by integrating a live chat support system into a business.

# The Customer Support Dashboard
This repo is all about the web dashboard for customer support which will be servicing their customers through a live chat with them.
The dashboard is built with a set of features will be found below.

## Screenshots

- ### Dashboard - Customer Support
![dashboard](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/6fc77398-8ea1-4663-bd6a-b901f005c958)

- ### Integrating website - Customer
![customer](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/b56672de-feaf-4613-b733-94f94cc88bdd)

## Features
- ### Agent invitation
![Agent invitation](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/77305c8f-e296-45f0-a7e4-a9d15e42776e)
![Agent invigation](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/a99f4572-5b73-49c7-b301-32dc02d337ac)

- ### Agent Grouping
![Agent Grouping](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/51a5d1c4-f243-45d2-8fd8-818229dd6db2)

- ### Live Chat with customers
![dashboard](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/6fc77398-8ea1-4663-bd6a-b901f005c958)

- ### Role-based users (Agent, User, Owner)
![Role-based users](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/76982af8-73ec-4438-895d-4c9cc63dc1b0)
![Role-based users](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/ff7bc409-7c0a-4d6d-9371-47448d211a11)

- ### Chat closing
![Chat closing](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/c963ab2d-6e4e-4e08-8c76-3125575c783e)

- ### Chat transferring
- ### Chat observing (for Owners and Admins)

- ### Customer Service Performance Reporting
![Customer Service Performance Reporting](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/17ade3b4-2b34-417a-b2e9-383c7dd3dc55)
![Customer Service Performance Reporting](https://github.com/Ahmad-Hamwi/sa3dni-dashboard/assets/37661295/270a1279-936d-4078-99b7-a60951aebdf6)

## Architecture
<img align="right" width="398" height="291" src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" />

The dashboard adopted Clean Architecture principles in its early stages, but as the dashboard evolved with requirements, it appeared to be that its main resposibility is to present data without any special domain business logic, so the layer remained somewhat empty, and thus resulted in removing the layer eventually, and the dashboard kept operating on Presentation and Infrastructure layers.

- ### Presentation Layer
The main responsibility of this layer is to handle presenting the data, providing good user experience, routing and navigation, animation, etc.

- ### Infrastructure Layer
The main responsibility of this layer is to handle presenting async and streamed data to the presentation layer, and mainly interacting with RESTful APIs and a WebSocket using SocketIO.
