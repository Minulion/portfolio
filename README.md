## My Portfolio

A modern and interactive portfolio website built with Next.js, and various React libraries to showcase my work, skills, and projects. Constantly updating to add more features and info.

## Features
- **Intro page** on load
- **Dynamic 3D background** on home page
- **Custom chatbot** prompted to talk like me, capable of conversations spanning work, hobbies, and philosophy
- **Personal blog** with burger reviews and more content to come
- **Licensed music** from Epidemic Sound:

-     Light mode: mr. - Keep the Lights On (Instrumental Version)
-     Dark mode: Hara Noda - Starry Night

## Stack

- **Next.js**
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Three.js**
- **OpenAI API**

## Contact Form Email Setup

The contact form now posts to `src/app/api/contact/route.ts` and expects these environment variables in `.env.local`:

```bash
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
CONTACT_TO_EMAIL="kminu1101@gmail.com"
```

Notes:
- `CONTACT_FROM_EMAIL` must use a sender address allowed by your Resend account. `onboarding@resend.dev` works for local testing.
- `CONTACT_TO_EMAIL` is where portfolio submissions will be delivered.
- The route sets `replyTo` to the visitor's email so you can respond directly from your inbox.

## To-Do
- Add images to experience, projects, blog posts
- More blog posts, features (tier list, search, sort)

