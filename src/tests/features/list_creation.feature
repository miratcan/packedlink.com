Feature: List Creation and Management
  As a user
  I want to create and manage link lists
  So that I can organize and share valuable content

  Scenario: Creating a new list
    Given I am on the homepage
    When I click the "Start New List" button
    And I enter "Weekly AI Resources" in the title field
    And I enter "Best AI tools I discovered this week" in the description field
    And I enter "Murat" in the curator name field
    And I enter "murat@example.com" in the email field
    Then the list should be created successfully
    And I should be redirected to the builder page

  Scenario: Adding a link to the list
    Given I am on the builder page
    And my list has no links
    When I click the "Add Link" button
    And I enter "OpenAI GPT-4" in the link title field
    And I enter "https://openai.com" in the link URL field
    And I enter "Most advanced language model" in the link notes field
    And I click the "Add" button
    Then the link should be added to my list
    And the link count should be 1

  Scenario: Publishing the list
    Given I am on the builder page
    And my list has at least 1 link
    When I click the "Publish" button
    Then the list should be published
    And a public URL should be generated
    And the management link should be displayed

  @mobile
  Scenario: Creating a list on mobile
    Given I am using a mobile device
    And I am on the homepage
    When I open the hamburger menu
    And I click on the "New List" option
    Then I should see a mobile-friendly form