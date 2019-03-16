export interface MailTemplate {
	id: string,
	name: string,
	content: string,
	type: MailTemplateType
}


export enum MailTemplateType {
	'Body' = 'body',
	'Attachment' = 'attachment'
}
