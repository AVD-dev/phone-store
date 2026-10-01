import { act, render } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ScrollTop } from "./scroll-top";

const scrollToMock = vi.fn();

function Layout() {
  return (
    <>
      <ScrollTop />

      <main className="app__main">
        <Outlet />
      </main>
    </>
  );
}

function createRouter(initialPath: string) {
  return createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            path: "/list",
            element: <div>List</div>,
          },
          {
            path: "/phones/:phoneId",
            element: <div>Detail</div>,
          },
          {
            path: "/cart",
            element: <div>Cart</div>,
          },
        ],
      },
    ],
    {
      initialEntries: [initialPath],
    },
  );
}

describe("ScrollTop", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    HTMLElement.prototype.scrollTo = scrollToMock;
  });

  it("should scroll smoothly when navigating within the same base route", async () => {
    const router = createRouter("/phones/1");

    render(<RouterProvider router={router} />);

    scrollToMock.mockClear();

    await act(async () => {
      await router.navigate("/phones/2");
    });

    expect(scrollToMock).toHaveBeenCalledTimes(1);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  it("should scroll instantly when navigating to a different base route", async () => {
    const router = createRouter("/phones/1");

    render(<RouterProvider router={router} />);

    scrollToMock.mockClear();

    await act(async () => {
      await router.navigate("/cart");
    });

    expect(scrollToMock).toHaveBeenCalledTimes(1);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });

  it("should scroll instantly when navigating from list to detail", async () => {
    const router = createRouter("/list");

    render(<RouterProvider router={router} />);

    scrollToMock.mockClear();

    await act(async () => {
      await router.navigate("/phones/1");
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });
});
