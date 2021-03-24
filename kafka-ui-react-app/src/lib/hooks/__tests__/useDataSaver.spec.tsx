import useDataSaver from '../useDataSaver';

describe('useDataSaver hook', () => {
  const content = {
    title: 'title',
  };
  describe('Save as file', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date('Wed Mar 24 2021 03:19:56 GMT-0700'));
    });

    afterAll(() => jest.useRealTimers());

    it('downloads json file', () => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.click = jest.fn();

      const mockCreate = jest
        .spyOn(document, 'createElement')
        .mockImplementation(() => link);

      const { saveFile } = useDataSaver('message', content);
      saveFile();

      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(link.download).toEqual('message_1616581196000.json');
      expect(link.href).toEqual(
        `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(content)
        )}`
      );
      expect(link.click).toHaveBeenCalledTimes(1);

      mockCreate.mockRestore();
    });

    it('downloads txt file', () => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.click = jest.fn();

      const mockCreate = jest
        .spyOn(document, 'createElement')
        .mockImplementation(() => link);

      const { saveFile } = useDataSaver('message', 'content');
      saveFile();

      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(link.download).toEqual('message_1616581196000.txt');
      expect(link.href).toEqual(
        `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify('content')
        )}`
      );
      expect(link.click).toHaveBeenCalledTimes(1);

      mockCreate.mockRestore();
    });
  });

  it('copies the data to the clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const { copyToClipboard } = useDataSaver('topic', content);
    copyToClipboard();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      JSON.stringify(content)
    );
  });
});
