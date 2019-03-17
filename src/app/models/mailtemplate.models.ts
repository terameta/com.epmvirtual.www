export interface MailTemplate {
	id: string,
	name: string,
	content: string,
	boundCollection: string,
	boundDocument: string,
	type: MailTemplateType
}


export enum MailTemplateType {
	'Body' = 'body',
	'Attachment' = 'attachment'
}
