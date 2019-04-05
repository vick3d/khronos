import React from "react";
import { shallow, mount } from "enzyme";
import { TimeTrackingTable } from "../components/timeTrackingTable";
const kimaiSaveTimeData = require("../modules/kimaiSaveTimeData");

describe("<TimeTrackingTable />", () => {
	it("saveTimeData gives positive response with correct values set", () => {
		const expected_call = {
			begin: "2019-03-03 13:00",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			description: "description",
			fixedRate: "0.0",
			hourlyRate: 100
		};

		const component = shallow(<TimeTrackingTable />);
		component.setState({
			begin: "2019-03-03 13:00",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			hourlyRate: 100
		});
		let spy = jest.spyOn(kimaiSaveTimeData, "saveData");
		let spy2 = jest.spyOn(component.instance(), "entryHandler");
		component.instance().saveTimeData();
		expect(spy).toHaveBeenCalledWith(expected_call);
		expect(spy2).toHaveBeenCalled();
	});
});
