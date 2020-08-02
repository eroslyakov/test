import * as builder from 'botbuilder';
import * as express from 'express';
import * as crypto from 'crypto';
import { io } from '../server';
import { OutgoingWebhookDeclaration, IOutgoingWebhook } from 'express-msteams-host';

/**
 * Implementation for Teams Webhooks Outgoing Webhook
 */
@OutgoingWebhookDeclaration('/api/webhook')
export class TeamsWebhooksOutgoingWebhook implements IOutgoingWebhook {
    /**
     * The constructor
     */
    public constructor() {}

    /**
     * Implement your outgoing webhook logic here
     * @param req the Request
     * @param res the Response
     * @param next
     */
    public requestHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        // parse the incoming message
        const incoming = req.body as builder.Activity;

        // create the response, any Teams compatible responses can be used
        let message: Partial<builder.Activity> = {
            type: builder.ActivityTypes.Message,
        };

        const securityToken = process.env.SECURITY_TOKEN;
        if (securityToken && securityToken.length > 0) {
            // There is a configured security token
            const auth = req.headers.authorization;
            const msgBuf = Buffer.from((req as any).rawBody, 'utf8');
            const msgHash =
                'HMAC ' +
                crypto
                    .createHmac('sha256', Buffer.from(securityToken as string, 'base64'))
                    .update(msgBuf)
                    .digest('base64');
            console.log(msgHash);
            if (msgHash === auth) {
                const recievedMessage = TeamsWebhooksOutgoingWebhook.scrubMessage(incoming.text);
                io.emit('message', recievedMessage);

                message.text = 'Successfully recieved!';
            } else {
                // Message could not be verified
                message.text = `Error: message sender cannot be verified`;
            }
        } else {
            // There is no configured security token
            message.text = `Error: outgoing webhook is not configured with a security token`;
        }

        // send the message
        res.send(JSON.stringify(message));
    }

    /**
     * remove the <at></at> text and any spaces to extract the planet name
     * @param incomingText planet name to scrub
     */
    private static scrubMessage(incomingText: string): string {
        let cleanMessage = incomingText
            .slice(incomingText.lastIndexOf('>') + 1, incomingText.length)
            .replace('&nbsp;', '');
        return cleanMessage;
    }
}
