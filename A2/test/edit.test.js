it("it should work", () => {
    const edit = new Edit("1", "2", 0);
    expect(edit.oldContent).toBe("1");
    expect(edit.newContent).toBe("2");
    expect(edit.number).toBe(0);
  });