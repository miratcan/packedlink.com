"""
Liste oluşturma feature'ı için step definitions
pytest-bdd kullanarak BDD testleri
"""

import pytest
from pytest_bdd import scenarios, given, when, then, parsers
from playwright.sync_api import Page, expect

# Feature dosyasını yükle
scenarios('../features/list_creation.feature')


# Fixtures - Commented out as it conflicts with pytest-playwright's context
# @pytest.fixture
# def context():
#     """Test context'i saklamak için"""
#     return {}


# Given steps (Başlangıç durumu)
@given("I am on the homepage")
def on_homepage(page: Page):
    """Ana sayfaya git"""
    page.goto("http://localhost:3000")
    expect(page).to_have_url("http://localhost:3000/")


@given("I am on the builder page")
def on_builder_page(page: Page):
    """Builder sayfasında olduğumuzu varsay"""
    # Normalde buraya login/manage_token ile gidilir
    manage_token = 'test-token'
    page.goto(f"http://localhost:3000/builder?token={manage_token}")


@given("my list has no links")
def no_links_in_list(page: Page):
    """Liste boş olmalı"""
    # Backend'den kontrol edilebilir
    pass


@given(parsers.parse("my list has at least {count:d} link"))
def has_links_in_list(page: Page, count: int):
    """Listede belirtilen sayıda link var"""
    # Backend'den kontrol edilebilir
    pass


@given("I am using a mobile device")
def using_mobile_device(page: Page):
    """Mobile viewport ayarla"""
    page.set_viewport_size({"width": 375, "height": 667})


# When steps (Aksiyon)
@when(parsers.parse('I click the "{button_text}" button'))
def click_button(page: Page, button_text: str):
    """Belirtilen butona tıkla"""
    page.get_by_role("button", name=button_text).click()


@when(parsers.parse('I enter "{value}" in the {field} field'))
def fill_field(page: Page, value: str, field: str):
    """Alan doldur"""
    field_map = {
        'title': "input[name='title']",
        'description': "textarea[name='description']",
        'curator name': "input[name='curator_name']",
        'email': "input[name='curator_email']",
        'link title': "input[name='link_title']",
        'link URL': "input[name='link_url']",
        'link notes': "textarea[name='link_notes']",
    }
    selector = field_map.get(field, f"input[name='{field}']")
    page.fill(selector, value)


@when("I open the hamburger menu")
def open_hamburger_menu(page: Page):
    """Mobile menüyü aç"""
    page.locator("[data-testid='mobile-menu']").click()


@when(parsers.parse('I click on the "{option}" option'))
def click_menu_option(page: Page, option: str):
    """Menü seçeneğine tıkla"""
    page.get_by_text(option).click()


# Then steps (Doğrulama)
@then("the list should be created successfully")
def list_should_be_created(page: Page):
    """Liste oluşturuldu mu kontrol et"""
    # Success mesajı veya redirect kontrolü
    expect(page).not_to_have_url("http://localhost:3000/")


@then("I should be redirected to the builder page")
def should_redirect_to_builder(page: Page):
    """Builder sayfasına yönlendirildi mi kontrol et"""
    import re
    expect(page).to_have_url(re.compile(r"/builder"))


@then("the link should be added to my list")
def link_should_be_added(page: Page):
    """Link eklendi mi kontrol et"""
    # Link'in görünür olduğunu kontrol et
    expect(page.locator(".link-item")).to_be_visible()


@then(parsers.parse("the link count should be {count:d}"))
def link_count_should_be(page: Page, count: int):
    """Link sayısını kontrol et"""
    links = page.locator(".link-item").all()
    assert len(links) == count


@then("the list should be published")
def list_should_be_published(page: Page):
    """Liste yayınlandı mı kontrol et"""
    # Success sayfasına yönlendirme veya mesaj kontrolü
    import re
    expect(page).to_have_url(re.compile(r"/success"))


@then("a public URL should be generated")
def public_url_should_be_created(page: Page):
    """Public URL gösteriliyor mu kontrol et"""
    public_url = page.locator("[data-testid='public-url']")
    expect(public_url).to_be_visible()
    expect(public_url).to_contain_text("http")


@then("the management link should be displayed")
def manage_link_should_be_shown(page: Page):
    """Yönetim linki gösteriliyor mu kontrol et"""
    manage_link = page.locator("[data-testid='manage-url']")
    expect(manage_link).to_be_visible()


@then("I should see a mobile-friendly form")
def should_see_mobile_form(page: Page):
    """Mobile uyumlu form kontrolü"""
    form = page.locator("form")
    expect(form).to_be_visible()
    # Mobile viewport'ta form düzgün görünüyor mu
    viewport = page.viewport_size
    assert viewport['width'] < 768  # Mobile width