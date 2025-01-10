import { defineField, defineType } from 'sanity'


export default defineType({
    name: 'users',
    title: 'Users',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name of User',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email of User',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'password',
            title: 'Password of User',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'weight',
            title: 'Weight',
            type: 'number',
        }),
    ],
})