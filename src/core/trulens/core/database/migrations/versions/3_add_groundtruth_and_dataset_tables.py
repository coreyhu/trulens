"""add_groundtruth_and_dataset_tables

Revision ID: 3
Revises: 2
Create Date: 2024-08-17 15:33:09.416935
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "3"
down_revision = "2"
branch_labels = None
depends_on = None


def upgrade(config) -> None:
    prefix = config.get_main_option("trulens.table_prefix")

    if prefix is None:
        raise RuntimeError("trulens.table_prefix is not set")

    # TODO: The automatically generated code below likely references
    #       tables such as "trulens_feedback_defs" or "trulens_records".
    #       However, the common prefix for these tables "trulens_" is
    #       actually configurable and so replace it with the variable
    #       prefix.
    #       e.g. replace "trulens_records" with prefix + "records".
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "trulens_dataset",
        sa.Column("dataset_id", sa.VARCHAR(length=256), nullable=False),
        sa.Column("dataset_json", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("dataset_id"),
    )
    op.create_table(
        "trulens_ground_truth",
        sa.Column("ground_truth_id", sa.VARCHAR(length=256), nullable=False),
        sa.Column("dataset_id", sa.Text(), nullable=False),
        sa.Column("ground_truth_json", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("ground_truth_id"),
    )

    # ### end Alembic commands ###


def downgrade(config) -> None:
    prefix = config.get_main_option("trulens.table_prefix")

    if prefix is None:
        raise RuntimeError("trulens.table_prefix is not set")

    # TODO: The automatically generated code below likely references
    #       tables such as "trulens_feedback_defs" or "trulens_records".
    #       However, the common prefix for these tables "trulens_" is
    #       actually configurable and so replace it with the variable
    #       prefix.
    #       e.g. replace "trulens_records" with prefix + "records".
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("trulens_ground_truth")
    op.drop_table("trulens_dataset")
    # ### end Alembic commands ###
