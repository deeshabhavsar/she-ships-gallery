DELETE FROM public.feedback WHERE project_id IN (SELECT id FROM public.projects);
DELETE FROM public.projects;