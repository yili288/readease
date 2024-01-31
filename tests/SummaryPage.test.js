import { render, waitFor } from '@testing-library/react-native';
import SummaryPage from "../src/screens/SummaryPage"

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      ok: true,
      json: () => {
        return { summary: "test summary"}
      }
    }),
  })
);

jest.mock("../src/utils/getTextSummary", () => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("test summary");
    })
  })
})

it('Shows loading message when no summary is available', async () => {
  const { getByText } = render(<SummaryPage textId="1" title="title" content="content"/>);

  await waitFor(() => {
    const loadingMessage = getByText("Loading...");
    expect(loadingMessage).toBeTruthy();
  });
  
});

it('Shows summary when summary is loaded', async () => {
  const { getByText } = render(<SummaryPage textId="1" title="title" content="content"/>);
  
  await waitFor(() => {
    const summary = getByText("test summary");
    expect(summary).toBeTruthy()
  });
});
