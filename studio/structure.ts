import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'program'),
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
