const mongoose = require('mongoose');
const sinon = require('sinon');
const assert = require('assert');
const scheduler = require('node-schedule');

const schema = new mongoose.Schema({
    text: { type: String, required: true },
    status: { type: String, required: true },
    scheduleRun: { type: Date, required: true }
}, {
    timestamps: true
});

const Model = mongoose.model('Test', schema);

describe('test', async () => {

    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/mongoose_sinon_faketimer', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.set('useFindAndModify', false);
    
        await mongoose.connection.dropDatabase();
    })
    
    // Run this on 5.10.4
    it('mongoose 5.10.4: working fine', async () => {
        const now = new Date();
        const later = new Date(now.getTime() + 60000);
        const clock = sinon.useFakeTimers(now);

        const newDoc = {
            text: 'name',
            status: 'old',
            scheduleRun: later,
        }
        
        const cDoc = await Model.create(newDoc);

        scheduler.scheduleJob(newDoc.scheduleRun, async (fireDate) => {
            console.log('Running @ ', fireDate);
            await Model.findByIdAndUpdate(cDoc._id, { status: 'scheduled' });
        });

        const oldDoc = await Model.find();
        console.log('Current time', new Date());
        console.log('Before', oldDoc, new Date());
        assert.strictEqual(oldDoc[0].status, 'old', 'status should be old');

        clock.tick(60000);

        const updatedDoc = await Model.find();
        console.log('Next tick time', new Date());
        console.log('After', updatedDoc, new Date());
        assert.strictEqual(updatedDoc[0].status, 'scheduled', 'status should be old');
    });

    // Run this on 5.10.5
    it.skip('mongoose 5.10.5: not working', async () => {
        const now = new Date();
        const later = new Date(now.getTime() + 60000);
        const clock = sinon.useFakeTimers(now);
        // const clock = sinon.useFakeTimers({now, toFake: ['Date', 'setTimeout']});

        const newDoc = {
            text: 'name',
            status: 'old',
            scheduleRun: later,
        }
        
        const cDoc = await Model.create(newDoc);

        scheduler.scheduleJob(newDoc.scheduleRun, async (fireDate) => {
            console.log('Running @ ', fireDate);
            await Model.findByIdAndUpdate(cDoc._id, { status: 'scheduled' });
        });

        const oldDoc = await Model.find();
        console.log('Current time', new Date());
        console.log('Before', oldDoc, new Date());
        assert.strictEqual(oldDoc[0].status, 'old', 'status should be old');

        clock.tick(60000);

        const updatedDoc = await Model.find();
        console.log('Next tick time', new Date());
        console.log('After', updatedDoc, new Date());
        assert.strictEqual(updatedDoc[0].status, 'scheduled', 'status should be old');
    });

    it.skip('mongoose 5.10.5: switch to toFake w/ only Date does not work', async () => {
        const now = new Date();
        const later = new Date(now.getTime() + 60000);
        // const clock = sinon.useFakeTimers(now);
        const clock = sinon.useFakeTimers({now, toFake: ['Date']});

        const newDoc = {
            text: 'name',
            status: 'old',
            scheduleRun: later,
        }
        
        const cDoc = await Model.create(newDoc);

        scheduler.scheduleJob(newDoc.scheduleRun, async (fireDate) => {
            console.log('Running @ ', fireDate);
            await Model.findByIdAndUpdate(cDoc._id, { status: 'scheduled' });
        });

        const oldDoc = await Model.find();
        console.log('Current time', new Date());
        console.log('Before', oldDoc, new Date());
        assert.strictEqual(oldDoc[0].status, 'old', 'status should be old');

        clock.tick(60000);

        const updatedDoc = await Model.find();
        console.log('Next tick time', new Date());
        console.log('After', updatedDoc, new Date());
        assert.strictEqual(updatedDoc[0].status, 'scheduled', 'status should be old');
    });

    // Run this on 5.10.5
    it.skip('mongoose 5.10.5: switch to toFake w/ setTimeout to get it working', async () => {
        const now = new Date();
        const later = new Date(now.getTime() + 60000);
        // const clock = sinon.useFakeTimers(now);
        const clock = sinon.useFakeTimers({now, toFake: ['Date', 'setTimeout']});

        const newDoc = {
            text: 'name',
            status: 'old',
            scheduleRun: later,
        }
        
        const cDoc = await Model.create(newDoc);

        scheduler.scheduleJob(newDoc.scheduleRun, async (fireDate) => {
            console.log('Running @ ', fireDate);
            await Model.findByIdAndUpdate(cDoc._id, { status: 'scheduled' });
        });

        const oldDoc = await Model.find();
        console.log('Current time', new Date());
        console.log('Before', oldDoc, new Date());
        assert.strictEqual(oldDoc[0].status, 'old', 'status should be old');

        clock.tick(60000);

        const updatedDoc = await Model.find();
        console.log('Next tick time', new Date());
        console.log('After', updatedDoc, new Date());
        assert.strictEqual(updatedDoc[0].status, 'scheduled', 'status should be old');
    });
})