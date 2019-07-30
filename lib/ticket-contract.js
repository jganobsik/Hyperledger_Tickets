/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TicketContract extends Contract {

    async init(ctx) {
        console.log('initiating');
    }

    async setup(ctx){
        console.log('initializing 2 event tickets and 2 users');

        let tixKey = 'HOCKEY';
        let ticket = {
            docType: 'ticket', description: 'Ticket for a Hockey Game', homeTeam: 'Washington Capitals', quantity: 4, owner: 'SLR1' };
        await ctx.stub.putState(tixKey, JSON.stringify(ticket));

        tixKey = 'FOOTBALL';
        ticket = {docType: 'ticket', description: 'Ticket for a Football Game', homeTeam: 'Cleveland Browns', quantity: 2, owner: 'SLR2' };
        await ctx.stub.putState(tixKey, JSON.stringify(ticket));

        let holderKey = 'SLR1';
        let ticketholder = {docType: 'holder', firstName: 'Alexander', lastName: 'Ovechkin'};
        await ctx.stub.putState(holderKey, JSON.stringify(ticketholder));

        holderKey = 'SLR2';
        ticketholder = {docType: 'holder', firstName: 'Baker', lastName: 'Mayfield'};
        await ctx.stub.putState(holderKey, JSON.stringify(ticketholder));

        return;
    }

    async checkQuantity(ctx, tixKey) {
        console.log('checking quantity');

        let ticketData = await ctx.stub.getState(tixKey);

        let tickets = JSON.parse(ticketData);
        console.log('Ticket Quanitity:' + tickets.quantity);

        return 'Ticket Quanitity:' + tickets.quantity;
    }

    async Transfer(ctx, tixKey, newHolder) {
        console.log('transferring tickets');

        let ticketData = await ctx.stub.getState(tixKey);
        if (ticketData.length > 0) {
            let tickets = JSON.parse(ticketData);
            tickets.holder = newHolder;
            console.log('New Holder:' + tickets.holder);
            await ctx.stub.putState(tixKey, JSON.stringify(tickets));

            return 'New Holder' + tickets.holder;

        } else {
            console.log('Tickets not found:' + tixKey);
            return 'Tickets not found:' + tixKey;
        }
    }
}




module.exports = TicketContract;
