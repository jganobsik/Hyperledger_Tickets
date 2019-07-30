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

        const tixKey = 'HOCKEY';
        let ticket = {
            docType: 'ticket', description: 'Ticket for a Hockey Game', homeTeam: 'Washington Capitals', quantity: 4, owner: 'SLR' };
        await ctx.stub.putState(tixKey, JSON.stringify(ticket));
    }

}


module.exports = TicketContract;
