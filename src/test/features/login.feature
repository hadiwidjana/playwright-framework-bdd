Feature: User authentication test

    Background:
        Given User navigates to homepage
        And User click login link

    Scenario: Login success
        When User enter the username as "<email>"
        And User enter the password as "<password>"
        And User select email verification option
        And User open new tab
        And User login to gmail using "<email>" and "<password>"
        And User open email to get the OTP
        And User enter OTP code
        Then login should be success

        Examples:
            | email | password |
            | satria.hadiwidjana@gmail.com | @Gecko1234 |

    Scenario: Login fail using invalid email
        When User enter the username as "<email>"
        Then login should fail

        Examples:
            | email |
            | satria.hadiw@gmail.com |
