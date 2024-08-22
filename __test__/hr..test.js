import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/Home";
import { useSession } from "next-auth/react";
import {
  useGetBookMarksQuery,
  useGetAllJobsQuery,
  useAddBookMarkMutation,
  useRemoveBookMarkMutation,
} from "@/lib/features/api/apiSlice";
import Spinner from "@/components/spinner";

// Mocking the necessary hooks and components
jest.mock("next-auth/react");
jest.mock("@/lib/features/api/apiSlice");
jest.mock("@/components/spinner");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Opportunities title", () => {
    useSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { data: [] }, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [] }, isLoading: false });

    render(<Home />);
    
    expect(screen.getByText("Opportunities")).toBeInTheDocument();
  });

  it("displays the Spinner component when loading jobs or bookmarks", () => {
    useSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ isLoading: true });
    useGetBookMarksQuery.mockReturnValue({ isLoading: false });
    
    Spinner.mockImplementation(() => <div data-testid="spinner"></div>);

    render(<Home />);
    
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows the correct number of results", () => {
    const mockJobs = [{ id: "1" }, { id: "2" }];
    
    useSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { data: mockJobs }, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [] }, isLoading: false });
    
    render(<Home />);
    
    expect(screen.getByText("Showing 2 results")).toBeInTheDocument();
  });

  it("renders a JobCard for each job", () => {
    const mockJobs = [
      { id: "1", categories: [], orgName: "Org 1", description: "Desc 1", logoUrl: "/logo1.png", location: ["Loc 1"], title: "Title 1", opType: "Full-time" },
      { id: "2", categories: [], orgName: "Org 2", description: "Desc 2", logoUrl: "/logo2.png", location: ["Loc 2"], title: "Title 2", opType: "Part-time" },
    ];
    
    useSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { data: mockJobs }, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [] }, isLoading: false });
    
    render(<Home />);
    
    expect(screen.getAllByRole("link").length).toBe(2);
  });

  it("handles bookmark addition", async () => {
    const mockJobs = [{ id: "1", categories: [], orgName: "Org 1", description: "Desc 1", logoUrl: "/logo1.png", location: ["Loc 1"], title: "Title 1", opType: "Full-time" }];
    const mockAddBookMark = jest.fn();

    useSession.mockReturnValue({ data: { user: { accessToken: "mockToken" } }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { data: mockJobs }, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [] }, isLoading: false });
    useAddBookMarkMutation.mockReturnValue([mockAddBookMark, {}]);
    
    render(<Home />);
    
    fireEvent.click(screen.getByText("Add Bookmark")); // Adjust this to the actual text or element used in your JobCard
    
    await waitFor(() => expect(mockAddBookMark).toHaveBeenCalledWith({ id: "1", TOKEN: "mockToken" }));
  });

  it("handles bookmark removal", async () => {
    const mockJobs = [{ id: "1", categories: [], orgName: "Org 1", description: "Desc 1", logoUrl: "/logo1.png", location: ["Loc 1"], title: "Title 1", opType: "Full-time" }];
    const mockRemoveBookMark = jest.fn();

    useSession.mockReturnValue({ data: { user: { accessToken: "mockToken" } }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { data: mockJobs }, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [{ eventID: "1" }] }, isLoading: false });
    useRemoveBookMarkMutation.mockReturnValue([mockRemoveBookMark, {}]);
    
    render(<Home />);
    
    fireEvent.click(screen.getByText("Remove Bookmark")); // Adjust this to the actual text or element used in your JobCard
    
    await waitFor(() => expect(mockRemoveBookMark).toHaveBeenCalledWith({ id: "1", TOKEN: "mockToken" }));
  });

  it("displays an error message when there's an error fetching jobs", () => {
    useSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    useGetAllJobsQuery.mockReturnValue({ data: { error: "Failed to load jobs" }, isError: true, isLoading: false });
    useGetBookMarksQuery.mockReturnValue({ data: { data: [] }, isLoading: false });

    render(<Home />);
    
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Failed to load jobs")).toBeInTheDocument();
  });
});
