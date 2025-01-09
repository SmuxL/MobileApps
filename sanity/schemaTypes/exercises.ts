import { defineField, defineType } from 'sanity'


export default defineType({
    name: 'exercises',
    title: 'Exercises',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name of Exercise',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description of Exercise',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'sets',
            title: 'Number of Sets',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'reps',
            title: 'Number of Reps',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: Rule => Rule.required(),
        }),
    ],
})
