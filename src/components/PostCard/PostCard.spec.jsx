import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render Postcard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: /title 1/ })).toHaveAttribute(
      "src",
      props.cover
    );

    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Body 1")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
