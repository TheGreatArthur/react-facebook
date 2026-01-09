import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
import PostCard from "./PostCard"

test("PostCard: affiche le contenu", () => {
  const post = {
    id: "p1",
    author: "Alice",
    content: "Hello",
    createdAt: new Date().toISOString(),
    likes: [],
    liked: false,
  }

  render(
    <MemoryRouter>
      <PostCard post={post} onToggleLike={() => {}} onDelete={() => {}} />
    </MemoryRouter>
  )

  expect(screen.getByText("Hello")).toBeInTheDocument()
})