
import { formatAndSplitTextIntoColumns } from "../format_and_split_text_into_columns"


describe('formatAndSplitTextIntoColumns', () => {
    // Test Text Processing
    it('should apply all text processing rules correctly', () => {
        const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz, and e.g. example.";
        const expectedResult = "This is a teststring with various rules like Fig. 1, 2.4GHz, and e.g. example.";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain(expectedResult);
    });

    // Test Edge Cases
    it('should handle empty strings', () => {
        const result = formatAndSplitTextIntoColumns('', 100);
        expect(result).toEqual([['']]);
    });

    // Test Overall Functionality
    it('should process and split text correctly', () => {
        const testString = "This is a test-\nstring with various rules like Fig. 1, 2.4 GHz. This part will be in a separate column.";
        const charLimit = 10;
        const expectedResult = [
            ['This is a teststring with various rules like Fig. 1, 2.4GHz.'],
            ['This part will be in a separate column.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [etc. ]', () => {
        const testString = "In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making. In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.";
        const charLimit = 10;
        const expectedResult = [
            ['In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.'],
            ['In this project, we will explore various aspects of environmental science, including climate change, renewable energy sources, biodiversity conservation, etc. , and their implications for future policy making.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [Section. ]', () => {
        const testString = "In our analysis, we found significant discrepancies in the data; Section. 3.2 of the report details these findings and their implications for the project. The implementation plan is divided into several phases, as outlined in the document; Section. 4.1 specifically discusses the initial deployment strategy and resource allocation.";
        const charLimit = 10;
        const expectedResult = [
            ['In our analysis, we found significant discrepancies in the data; Section. 3.2 of the report details these findings and their implications for the project.'],
            ['The implementation plan is divided into several phases, as outlined in the document; Section. 4.1 specifically discusses the initial deployment strategy and resource allocation.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [Table. ]', () => {
        const testString = "In our analysis, we found significant discrepancies in the data; Table. 3 of the report details these findings and their implications for the project. The implementation plan is divided into several phases, as outlined in the document; Table. 4 specifically discusses the initial deployment strategy and resource allocation.";
        const charLimit = 10;
        const expectedResult = [
            ['In our analysis, we found significant discrepancies in the data; Table. 3 of the report details these findings and their implications for the project.'],
            ['The implementation plan is divided into several phases, as outlined in the document; Table. 4 specifically discusses the initial deployment strategy and resource allocation.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [vs. ]', () => {
        const testString = "In the heated debate of cats vs. dogs, each side presents compelling arguments for their favorite pet. The classic battle of wits vs. strength is often portrayed in heroic tales, where cunning often triumphs over brute force.";
        const charLimit = 10;
        const expectedResult = [
            ['In the heated debate of cats vs. dogs, each side presents compelling arguments for their favorite pet.'],
            ['The classic battle of wits vs. strength is often portrayed in heroic tales, where cunning often triumphs over brute force.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [size. ]', () => {
        const testString = "When shopping for clothes, it's essential to consider your body size. The small backpack comes in various colors and sizes.";
        const charLimit = 10;
        const expectedResult = [
            ["When shopping for clothes, it's essential to consider your body size."],
            ['The small backpack comes in various colors and sizes.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [time. ]', () => {
        const testString = "All good things must come to an end, time. After this moment passes, we begin anew with lessons learned and memories cherished.";
        const charLimit = 10;
        const expectedResult = [
            ["All good things must come to an end, time."],
            ['After this moment passes, we begin anew with lessons learned and memories cherished.']
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [1.5 Hz. ]', () => {
        const testString = "The gentle waves, oscillating at a frequency of 1.5 Hz, brought a calming rhythm to the serene beach. In the laboratory, we observed that the pendulum's natural frequency settled at 1.5 Hz, demonstrating a consistent pattern in its motion.";
        const charLimit = 10;
        const expectedResult = [
            ['The gentle waves, oscillating at a frequency of 1.5 Hz, brought a calming rhythm to the serene beach.'],
            ["In the laboratory, we observed that the pendulum's natural frequency settled at 1.5 Hz, demonstrating a consistent pattern in its motion."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [eq. 2.]', () => {
        const testString = "As demonstrated in eq. 2., the energy efficiency of this system surpasses that of traditional methods by a significant margin. The relationship between temperature and pressure in this experiment can be accurately described by eq. 2., which aligns with the theoretical predictions.";
        const charLimit = 10;
        const expectedResult = [
            ['As demonstrated in eq. 2., the energy efficiency of this system surpasses that of traditional methods by a significant margin.'],
            ["The relationship between temperature and pressure in this experiment can be accurately described by eq. 2., which aligns with the theoretical predictions."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    // Test for hyphen followed by newline
    it('should remove hyphen followed by newline', () => {
        const testString = "Test-\nString";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('TestString');
    });

    // Test for newlines replaced with spaces
    it('should replace newlines with spaces', () => {
        const testString = "Test\nString";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('Test String');
    });

    // Test for hyphens followed by a space
    it('should remove hyphens followed by a space', () => {
        const testString = "Test- String";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('TestString');
    });

    // ... (Additional tests for each replacement rule) ...

    // Test for specific frequency value
    it('should format specific frequency value', () => {
        const testString = "Frequency is 2.4 GHz";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('2.4GHz');
    });

    // Test for formatting numbers with commas
    it('should format numbers with commas', () => {
        const testString = "Figure 3.1,234 shows";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('Figure 3.1,234 shows');
    });

    // ... (Additional tests for each replacement rule) ...

    // Test for Roman numerals followed by a period
    it('should handle Roman numerals followed by a period', () => {
        const testString = "In section IV.we discuss";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('In section IV.we discuss');
    });

    // Test for number ranges
    it('should format number ranges', () => {
        const testString = "See pages 10.23-56 for more information";
        const result = formatAndSplitTextIntoColumns(testString, 1000);
        expect(result.join(' ')).toContain('See pages 10.23-56 for more information');
    });

    it('should process and split text correctly [Jan.]', () => {
        const testString = "Exciting events start in Jan. as the new year kicks off. City streets are covered in snow in Jan. making it a winter wonderland.";
        const charLimit = 10;
        const expectedResult = [
            ["Exciting events start in Jan. as the new year kicks off."],
            ["City streets are covered in snow in Jan. making it a winter wonderland."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

    it('should process and split text correctly [Feb.]', () => {
        const testString = "Valentine's Day in Feb. brings couples closer together. Feb. often feels colder, despite being shorter.";
        const charLimit = 10;
        const expectedResult = [
            ["Valentine's Day in Feb. brings couples closer together."],
            ["Feb. often feels colder, despite being shorter."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Mar.]', () => {
        const testString = "Mar. marks the beginning of spring, with flowers starting to bloom. The St.Patrick's Day parade in Mar. is a highlight of the month.";
        const charLimit = 10;
        const expectedResult = [
            ["Mar. marks the beginning of spring, with flowers starting to bloom."],
            ["The St.Patrick's Day parade in Mar. is a highlight of the month."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Apr.]', () => {
        const testString = "April showers in Apr. bring May flowers. Easter often falls in Apr., bringing joy and chocolate eggs.";
        const charLimit = 10;
        const expectedResult = [
            ["April showers in Apr. bring May flowers."],
            ["Easter often falls in Apr., bringing joy and chocolate eggs."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [May.]', () => {
        const testString = "Warm weather and outdoor activities return in May. making it a beloved time of year. Mother's Day, celebrated in May. is a special occasion for families.";
        const charLimit = 10;
        const expectedResult = [
            ["Warm weather and outdoor activities return in May. making it a beloved time of year."],
            ["Mother's Day, celebrated in May. is a special occasion for families."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Jun.]', () => {
        const testString = "Jun. is the start of summer vacation for many students. Longer days in Jun. mean more time for fun in the sun.";
        const charLimit = 10;
        const expectedResult = [
            ["Jun. is the start of summer vacation for many students."],
            ["Longer days in Jun. mean more time for fun in the sun."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Jul.]', () => {
        const testString = "Jul. is famous for Independence Day fireworks and celebrations. The heat in Jul. encourages trips to the beach or pool.";
        const charLimit = 10;
        const expectedResult = [
            ["Jul. is famous for Independence Day fireworks and celebrations."],
            ["The heat in Jul. encourages trips to the beach or pool."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Aug.]', () => {
        const testString = "Aug. is the peak of summer, perfect for barbecues and outdoor festivals. Many families take their vacations in Aug. to enjoy the summer break.";
        const charLimit = 10;
        const expectedResult = [
            ["Aug. is the peak of summer, perfect for barbecues and outdoor festivals."],
            ["Many families take their vacations in Aug. to enjoy the summer break."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Sep.]', () => {
        const testString = "Sep. brings the start of the autumn season and cooler temperatures. Schools reopen in Sep., marking the end of summer break.";
        const charLimit = 10;
        const expectedResult = [
            ["Sep. brings the start of the autumn season and cooler temperatures."],
            ["Schools reopen in Sep., marking the end of summer break."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Oct.]', () => {
        const testString = "Halloween in Oct. is a time for costumes, candy, and spooky fun. The leaves turn beautiful colors in Oct., signaling the heart of fall.";
        const charLimit = 10;
        const expectedResult = [
            ["Halloween in Oct. is a time for costumes, candy, and spooky fun."],
            ["The leaves turn beautiful colors in Oct., signaling the heart of fall."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Nov.]', () => {
        const testString = "Thanksgiving in Nov. brings families together for a feast. The weather in Nov. becomes chillier, preparing us for winter.";
        const charLimit = 10;
        const expectedResult = [
            ["Thanksgiving in Nov. brings families together for a feast."],
            ["The weather in Nov. becomes chillier, preparing us for winter."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [Dec.]', () => {
        const testString = "Dec. is filled with holiday cheer and festive decorations. The year ends with celebrations and reflections in Dec.";
        const charLimit = 10;
        const expectedResult = [
            ["Dec. is filled with holiday cheer and festive decorations."],
            ["The year ends with celebrations and reflections in Dec."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });
    
    it('should process and split text correctly [cf.]', () => {
        const testString = "The theory of evolution by natural selection has been widely accepted by scientists since its introduction by Charles Darwin, cf. his book \"On the Origin of Species\". Many psychologists suggest that early childhood experiences have a significant impact on adult behavior, cf. the works of Sigmund Freud on psychoanalysis.";
        const charLimit = 10;
        const expectedResult = [
            ["The theory of evolution by natural selection has been widely accepted by scientists since its introduction by Charles Darwin, cf. his book \"On the Origin of Species\"."],
            ["Many psychologists suggest that early childhood experiences have a significant impact on adult behavior, cf. the works of Sigmund Freud on psychoanalysis."]
        ];
        const result = formatAndSplitTextIntoColumns(testString, charLimit);
        expect(result).toEqual(expectedResult);
    });

});
