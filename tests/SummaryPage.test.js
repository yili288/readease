import { render } from '@testing-library/react-native';
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

it('Shows loading message when no summary is available', () => {
  const { getByText } = render(<SummaryPage textId="1" title="title" content="content"/>);

  jest.mock("../src/utils/getTextSummary", () => {
    return jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve("test summary");
      })
    })
  })

  const loadingMessage = getByText("Loading...");
  expect(loadingMessage).toBeTruthy();
})