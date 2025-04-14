import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection("blog", (post) => !post.data.draft)
  return rss({
    title: 'jiahao.blog',
    description: 'Random musings about life and thoughts on software engineering',
    site: context.site,
    items: blog
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.url != null ? `This post was published on ${post.data.url}` : post.rendered.html,
        link: `/post/${post.id}`
      })),
    trailingSlash: false,
    customData: `<language>en-us</language>`,
  });
}
