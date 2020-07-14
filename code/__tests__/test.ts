test('sum two numbers', async done => {

    function sum(a: number, b: number){
        return a + b;
    }
    
    const expected = sum(1, 3);
    expect(expected).toBe(4);

    done();
});