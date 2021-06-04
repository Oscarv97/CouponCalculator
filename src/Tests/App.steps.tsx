import { mount } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./features/CouponCalculator.feature", { loadRelativePath: true });

defineFeature(feature, (test) => {
    test('As I User I want to see my monthly spend', ({ given, when, then }) => {
        given('I have Users loaded', () => {

        });

        when('The Chart loads', () => {

        });

        then(/^I see the montly cost of giving my user a \$(\d+) voucher$/, (arg0) => {

        });
    });


    test('As I User I want to refine the results by cutomer spend', ({ given, when, then }) => {
        given('I have Users loaded', () => {

        });

        when('The Chart loads', () => {

        });

        then('I Adjust the User spend Cutoff', () => {

        });

        then(/^I see the refined montly cost of giving my user a \$(\d+) voucher$/, (arg0) => {

        });
    });
    test('As I User I want to refine the results by Gender', ({ given, when, then }) => {
        given('I have Users loaded', () => {

        });

        when('The Chart loads', () => {

        });

        then('I Adjust the User spend Cutoff', () => {

        });

        then(/^I see the refined montly cost of giving my user a \$(\d+) voucher$/, (arg0) => {

        });
    });


    test('As I User I want to refine the results by Region', ({ given, when, then }) => {
        given('I have Users loaded', () => {

        });

        when('The Chart loads', () => {

        });

        then('I Adjust the User spend Cutoff', () => {

        });

        then(/^I see the refined montly cost of giving my user a \$(\d+) voucher$/, (arg0) => {

        });
    });

});
