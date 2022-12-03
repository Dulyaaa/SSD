# 🔐 Secure Software Development

## Scenario
ABC Company is looking to create a custom web/mobile app to allow their staff to save messages or
to upload files to a central server. The high-level functional requirements are given below.
* The proposed system is a client server system to be run over an unsecure network
* The client app will act as a simple interface which allows users to log in and provide
messages or files
* The server app will act as a database/data repository which allows the messages or files to
be stored
* The system should allow an administrator to create accounts for staff members – this can be
hardcoded into system
* The staff can login to system using the username and password allocated to them
* The staff can be of two main roles
    * Workers – can only save messages
    * Managers – can save messages and upload files
* The system should be able to send the messages and files over an unsecure network (from
client to server) with the below security requirements
    * Confidentiality
    * Integrity
    * Message authentication
    * The client should be able to identify the server before any files are sent
