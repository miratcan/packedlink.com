from django import forms

from .models import Link, List, ListEvent


class ListStartForm(forms.ModelForm):
    class Meta:
        model = List
        fields = [
            "title",
            "description",
            "curator_name",
            "curator_email",
        ]
        widgets = {
            "description": forms.Textarea(attrs={"rows": 4}),
        }

    def save(self, commit: bool = True):
        instance: List = super().save(commit=commit)
        if commit:
            ListEvent.log(list_obj=instance, event_type=ListEvent.EventType.CREATED)
        return instance


class ListUpdateForm(forms.ModelForm):
    class Meta:
        model = List
        fields = [
            "title",
            "description",
            "curator_name",
            "curator_email",
        ]
        widgets = {
            "description": forms.Textarea(attrs={"rows": 3}),
        }


class LinkForm(forms.ModelForm):
    class Meta:
        model = Link
        fields = ["title", "url", "notes"]
        widgets = {
            "notes": forms.Textarea(attrs={"rows": 2}),
        }

    def save(self, list_obj: List, commit: bool = True):
        link: Link = super().save(commit=False)
        link.list = list_obj
        if commit:
            link.save()
            ListEvent.log(
                list_obj=list_obj,
                event_type=ListEvent.EventType.LINK_ADDED,
                metadata={"link_id": link.pk, "title": link.title},
            )
        return link
