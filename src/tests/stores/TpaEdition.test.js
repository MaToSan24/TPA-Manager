import { setActivePinia, createPinia } from 'pinia'
import { useTpaEditionStore } from "@/stores/tpaEdition";
import { useRoute } from 'vue-router'
import axios from 'axios'

vi.mock('axios')

describe("TpaEdition store", () => {
    let store;
    const testTpa = {"id":"tpa-1010101010","version":"1.0.0","type":"agreement","context":{"infrastructure":{},"validity":{"initial":"2017-10-15","timeZone":"America/Los_Angeles"},"definitions":{"schemas":{},"dashboards":{"main":{"base":"http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/base.json","modifier":"http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/modifier.js","overlay":"http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/overlay.js"}},"scopes":{"development":{"project":{"name":"Project","description":"Project","type":"string","default":"1010101010"},"class":{"name":"Class","description":"Group some projects","type":"string","default":"2020202020"}}},"collectors":{"eventcollector":{"infrastructurePath":"internal.collector.events","endpoint":"/api/v2/computations","type":"POST-GET-V1","config":{"scopeManager":"http://bluejay-scope-manager/api/v1/scopes/development"}}}}},"terms":{"metrics":{"PERCENTAGE_NEWBRANCHWR_STARTEDSTORIES":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":{"percentage":{"related":{"ghwrapper":{"events":{"type":"CreateEvent","payload":{"ref_type":"branch"}}},"window":86400}}},"event":{"pivotal":{"activity":{"highlight":"started"}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"PERCENTAGE_OPENPR_FINISHEDSTORIES":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":{"percentage":{"related":{"github":{"allPR":{}},"window":86400}}},"event":{"pivotal":{"activity":{"highlight":"finished"}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"PERCENTAGE_MERGEPR_DELIVEREDSTORIES":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":{"percentage":{"related":{"github":{"mergedPR":{}},"window":86400}}},"event":{"pivotal":{"activity":{"highlight":"delivered"}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"PERCENTAGE_RELEASES_DELIVEREDSTORIES":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":{"percentage":{"related":{"heroku":{"releases":{"status":"succeeded","description":"%CONTAINS%Deploy"}},"window":86400000}}},"event":{"pivotal":{"activity":{"highlight":"delivered"}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"PERCENTAGE_MASTER_PR_MERGE_CHANGES_UNDER_300":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":{"percentage":{"related":{"github":{"closedPRFiles":{"changes":"%SECOND%%LOWER_OR_EQUAL%300"}}}}},"event":{"github":{"closedPRFiles":{}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"NUMBER_GITHUB_MERGE_PR":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"actual","element":"number","event":{"github":{"mergedPR":{}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}},"STDEV_GITHUB_MERGE_PR":{"collector":{"$ref":"#/context/definitions/collectors/eventcollector"},"measure":{"computing":"string","element":{"stdev":{"period":"daily"}},"event":{"github":{"mergedPR":{}}},"scope":{"$ref":"#/context/definitions/scopes/development"}}}},"guarantees":[{"id":"75_PERCENT_MASTER_PR_OPEN_FINSH_STORIES_WITHIN_A_DAY","notes":"#### Description\r\n```\r\nTP-1: At least 75% of finished stories(PT) must match creation of a PR within a day.","description":"At least 75% of finished stories must match the creation of a PR within a day.","scope":{"$ref":"#/context/definitions/scopes/development"},"of":[{"scope":{"project":"1010101010"},"objective":"PERCENTAGE_OPENPR_FINISHEDSTORIES >= 75","with":{"PERCENTAGE_OPENPR_FINISHEDSTORIES":{}},"window":{"type":"static","period":"daily","initial":"2018-01-01"}}]},{"id":"75_PERCENT_MASTER_PR_MERGE_DELVR_STORIES_WITHIN_A_DAY","notes":"#### Description\r\n```\r\nTP-1: At least 75% of delivered stories(PT) must match a the merge of a PR into master within a day.","description":"At least 75% of delivered stories must match the merge of a PR into master within a day.","scope":{"$ref":"#/context/definitions/scopes/development"},"of":[{"scope":{"project":"1010101010"},"objective":"PERCENTAGE_MERGEPR_DELIVEREDSTORIES >= 75","with":{"PERCENTAGE_MERGEPR_DELIVEREDSTORIES":{}},"window":{"type":"static","period":"daily","initial":"2018-01-01"}}]},{"id":"75_PERCENT_MASTER_PR_MERGE_LESS_THAN_300_CHANGES_WITHIN_A_DAY","notes":"#### Description\r\n```\r\nTP-1: At least 75% of delivered stories(PT) must match a the merge of a PR into master within a day.","description":"At least 75% of delivered stories must match the merge of a PR into master within a day.","scope":{"$ref":"#/context/definitions/scopes/development"},"of":[{"scope":{"project":"1010101010"},"objective":"PERCENTAGE_MASTER_PR_MERGE_CHANGES_UNDER_300 >= 75","with":{"PERCENTAGE_MASTER_PR_MERGE_CHANGES_UNDER_300":{}},"window":{"type":"static","period":"daily","initial":"2018-01-01"}}]},{"id":"NUMBER_MASTER_PR_MERGE_WEEKLY_OVER_1_OR_EQUAL","notes":"#### Description\r\n```\r\nTP-1: At least 75% of delivered stories(PT) must match a the merge of a PR into master within a day.","description":"At least 75% of delivered stories must match the merge of a PR into master within a day.","scope":{"$ref":"#/context/definitions/scopes/development"},"of":[{"scope":{"project":"1010101010"},"objective":"NUMBER_GITHUB_MERGE_PR >= 1","with":{"NUMBER_GITHUB_MERGE_PR":{}},"window":{"type":"static","period":"weekly","initial":"2018-01-01"}}]},{"id":"STDEV_GITHUB_MERGE_PR_WEEKLY_UNDER_1","notes":"#### Description\r\n```\r\nTP-1: At least 75% of delivered stories(PT) must match a the merge of a PR into master within a day.","description":"At least 75% of delivered stories must match the merge of a PR into master within a day.","scope":{"$ref":"#/context/definitions/scopes/development"},"of":[{"scope":{"project":"1010101010"},"objective":"STDEV_GITHUB_MERGE_PR < 1","with":{"STDEV_GITHUB_MERGE_PR":{}},"window":{"type":"static","period":"weekly","initial":"2018-01-01"}}]}]}}
    
    beforeEach(() => {
        
        vi.mock('vue-router', () => ({ useRoute: vi.fn() }))
        vi.mocked(useRoute).mockReturnValue({ path: "/edition/2020202020/1010101010" })

        setActivePinia(createPinia());
        store = useTpaEditionStore();
        store.router = { push: vi.fn() };
        store.setInitialTpaData(testTpa);
    })

    test("should set initial TPA data", () => {
        expect(store.modifiedTpa.id).toBe("tpa-1010101010");
    });

    test("should save TPA changes", async () => {
        store.modifiedTpa.context.definitions.scopes.development.project.default = "new-project-id";
        store.modifiedTpa.context.definitions.scopes.development.class.default = "new-course-id";
        axios.delete.mockResolvedValue();
        axios.post.mockResolvedValue();
        await store.saveTpaChanges();
        expect(store.modifiedTpa.context.definitions.scopes.development.project.default).toBe("new-project-id");
        expect(store.modifiedTpa.context.definitions.scopes.development.class.default).toBe("new-course-id");
        expect(store.modifiedTpa.context.definitions.dashboards.main.base).toBe("http://host.docker.internal:5200/api/v1/public/grafana-dashboards/tpa/base.json");
        expect(store.modifiedTpa.context.definitions.dashboards.main.modifier).toBe("http://host.docker.internal:5200/api/v1/public/grafana-dashboards/tpa/modifier.js");
        expect(store.modifiedTpa.context.definitions.dashboards.main.overlay).toBe("http://host.docker.internal:5200/api/v1/public/grafana-dashboards/tpa/overlay.js");
    });

    test("should save TPA changes and redirect to the TPA list", async () => {
        const spy = vi.spyOn(store.router, "push");
        store.modifiedTpa.context.definitions.scopes.development.project.default = "new-project-id";
        store.modifiedTpa.context.definitions.scopes.development.class.default = "new-course-id";
        await store.saveTpaChanges();
        expect(spy).toHaveBeenCalledWith({ name: "edition", params: { courseId: "new-course-id", projectId: "new-project-id" } });
    });

    test("should get the TPA fields", () => {
        expect(store.getTpaField("id")).toBe("tpa-1010101010");
        expect(store.getTpaField("context.definitions.scopes.development.project.default")).toBe("1010101010");
        expect(store.getTpaField("context.definitions.scopes.development.class.default")).toBe("2020202020");
        expect(store.getTpaField("context.definitions.dashboards.main.base")).toBe("http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/base.json");
        expect(store.getTpaField("context.definitions.dashboards.main.modifier")).toBe("http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/modifier.js");
        expect(store.getTpaField("context.definitions.dashboards.main.overlay")).toBe("http://bluejay-assets-manager/api/v1/public/grafana-dashboards/tpa/overlay.js");
    });

    test("should get the TPA fields and return undefined if the field does not exist", () => {
        expect(store.getTpaField("context.unexisting")).toBe(undefined);
    });

    test("should update the TPA fields", () => {
        store.updateTpaField("context.definitions.scopes.development.project.default", "new-project-id");
        store.updateTpaField("context.definitions.scopes.development.class.default", "new-course-id");
        expect(store.modifiedTpa.context.definitions.scopes.development.project.default).toBe("new-project-id");
        expect(store.modifiedTpa.context.definitions.scopes.development.class.default).toBe("new-course-id");
    });

    test("should delete the TPA fields", () => {
        store.deleteTpaField("context.definitions.scopes.development.project.default");
        store.deleteTpaField("context.definitions.scopes.development.class.default");
        expect(store.modifiedTpa.context.definitions.scopes.development.project.default).toBe(undefined);
        expect(store.modifiedTpa.context.definitions.scopes.development.class.default).toBe(undefined);
    });

    test("should discard the TPA changes", () => {
        const spy = vi.spyOn(window.location, "reload");
        store.modifiedTpa.context.definitions.scopes.development.project.default = "new-project-id";
        store.modifiedTpa.context.definitions.scopes.development.class.default = "new-course-id";
        store.discardTpaChanges();
        expect(store.discardButtonClicked).toBe(true);
        expect(spy).toHaveBeenCalled();
    });

});

