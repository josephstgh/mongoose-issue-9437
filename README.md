# README

This project is init with `mongoose: 5.10.4` and one test case to run, this is to demo the test passes before upgrading to `5.10.5` and different `sinon.useFakeTimers` configuration

Uses 3 key library: `mongoose, sinon and node-schedule`

Use `mongoose` to create new doc, use `node-schedule` to schedule an update at a later time, and lastly, use `sinon.useFakeTimers` to mock time

## Test #1

1. npm i
2. npm run test
3. test pass

## Test #2

1. update `mongoose` to `5.10.5` in `package.json`
2. npm i
3. `skip` the first test, remove `skip` from second test
4. test fail

## Test #3

1. `skip` first two test
2. enable third test
3. run test
4. test fail (mocking `Date` only, scheduler doesn't seem to take effect)

## Test #4

1. `skip` all test except last
2. run test
3. test pass (this is with mocking both `Date` and `setTimeout`)