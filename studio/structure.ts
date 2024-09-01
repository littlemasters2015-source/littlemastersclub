import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...S.documentTypeListItems()
        .filter((item) => !['program', 'homePage'].includes(item.getId() ?? ''))
        .toSorted((a, b) => {
          // always put pages at the front, sort alphabetically otherwise
          if (a.getId() === 'page' && b.getId() !== 'page') {
            return -1
          } else if (b.getId() === 'page' && a.getId() !== 'page') {
            return 1
          } else {
            return (a.getId() ?? '').localeCompare(b.getId() ?? '')
          }
        }),
      S.listItem()
        .title('Current Programs')
        .child(
          S.documentList()
            .title('Current Programs')
            .filter('_type == "program" && status == "current"'),
        ),
      S.listItem()
        .title('Old Programs')
        .child(
          S.documentList().title('Old Programs').filter('_type == "program" && status == "old"'),
        ),
    ])
