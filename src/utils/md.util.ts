/**
 * Utility function for constructing mdast quickly.
 */

export function mdElement(
  name: string,
  properties: { [key: string]: any },
  ...children: any
) {
  return {
    type: "element",
    data: {
      hName: name,
      hProperties: properties,
    },
    children,
  };
}

export function mdText(text: any) {
  return {
    type: "text",
    value: text,
  };
}

export function mdParagraph(
  text: any,
  properties: { [key: string]: any } = {},
) {
  return {
    type: "paragraph",
    data: {
      hProperties: properties,
    },
    children: [mdText(text)],
  };
}

export function mdEditElement(
  element: object,
  properties: { [key: string]: any },
) {
  return {
    data: {
      hProperties: properties,
    },
    ...element,
  };
}

export function mdInlineCode(
  text: any,
  properties: { [key: string]: any } = {},
) {
  return {
    type: "inlineCode",
    value: text,
    data: {
      hProperties: properties,
    },
  };
}

export function mdCode(
  text: any,
  lang?: string | null,
  properties: { [key: string]: any } = {},
) {
  return {
    type: "code",
    value: text,
    lang,
    data: {
      hProperties: properties,
    },
  };
}

export function mdLink(
  text: any,
  url: string,
  properties: { [key: string]: any } = {},
) {
  return {
    type: "link",
    url,
    title: text,
    data: {
      hProperties: properties,
    },
    children: [mdText(text)],
  };
}
