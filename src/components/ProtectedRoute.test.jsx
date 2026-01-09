import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { AuthContext } from "../context/AuthContext"

function FeedPage() { return <h1>FEED</h1> }
function LoginPage() { return <h1>LOGIN</h1> }

test("ProtectedRoute: redirige vers /login si user est null", () => {
  render(
    <AuthContext.Provider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )

  expect(screen.getByText("LOGIN")).toBeInTheDocument()
  expect(screen.queryByText("FEED")).not.toBeInTheDocument()
})