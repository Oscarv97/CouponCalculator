Feature: Coupon App

Scenario: As I User I want to see my monthly spend 
Given I have Users loaded
When The Chart loads
Then I see the montly cost of giving my user a $5 voucher

Scenario: As I User I want to refine the results by cutomer spend 
Given I have Users loaded
When The Chart loads
Then I Adjust the User spend Cutoff
Then I see the refined montly cost of giving my user a $5 voucher

Scenario: As I User I want to refine the results by Gender 
Given I have Users loaded
When The Chart loads
Then I Adjust the User spend Cutoff
Then I see the refined montly cost of giving my user a $5 voucher

Scenario: As I User I want to refine the results by Region 
Given I have Users loaded
When The Chart loads
Then I Adjust the User spend Cutoff
Then I see the refined montly cost of giving my user a $5 voucher