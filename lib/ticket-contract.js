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
    }
}




module.exports = TicketContract;
