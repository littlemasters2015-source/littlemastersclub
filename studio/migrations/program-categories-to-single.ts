import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate program categories from array to single category',
  documentTypes: ['program'],

  migrate: {
    // First, set the new single category field from the first item in the categories array
    document(doc) {
      // Only process documents that have the old categories field
      if (!doc.categories || !Array.isArray(doc.categories) || doc.categories.length === 0) {
        return
      }

      // Take the first category from the array and set it as the single category
      const firstCategory = doc.categories[0]

      return [
        // Set the new category field with the first category reference
        at('category', setIfMissing(firstCategory)),
        // Remove the old categories array field
        at('categories', unset()),
      ]
    },
  },
})
